import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import useErrorMainApiHandler from '../../utils/hooks/useErrorMainApiHandler';
import './App.css';
import fetchIsOk from '../../images/Goodrequest.svg';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { filterMovies } from '../../utils/index';
import { auth } from '../../utils/Auth';
import Profile from '../User/Profile/Profile';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../User/Register/Register';
import Login from '../User/Login/Login';
import InfoToolTip from '../InfoToolTip/InfoToolTip';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [movies, setMovies] = useState(null);
  const [moviesSearchQuery, setMoviesSearchQuery] = useState(
    localStorage.getItem('moviesSearchQuery') ?? ''
  );
  const [isMoviesIsShort, setIsMoviesIsShort] = useState(
    JSON.parse(localStorage.getItem('isMoviesIsShort')) ?? false
  );
  const [moviesInputValue, setMoviesInputValue] = useState(
    localStorage.getItem('moviesSearchQuery') ?? ''
  );
  const [savedMovies, setSavedMovies] = useState(null);
  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = useState('');
  const [savedMoviesIsShort, setSavedMoviesIsShort] = useState(false);
  const [savedMoviesInputValue, setSavedMoviesInutValue] = useState('');
  const {
    isInfoToolTipActive,
    setIsInfoToolTipActive,
    isInfoTooltipMessage,
    setIsInfoTooltipMessage,
    isFetching,
    setIsFetching,
    setMaimApiError,
    errorHandler
  } = useErrorMainApiHandler();

  const resetState = () => {
    const stateKeys = [
      'jwt',
      'movies',
      'moviesSearchQuery',
      'isMoviesIsShort',
    ];
    stateKeys.forEach((key) => localStorage.removeItem(key));
    setMovies(null);
    setMoviesSearchQuery('');
    setIsMoviesIsShort(false);
    setMoviesInputValue('');
    setSavedMovies(null);
    setSavedMoviesSearchQuery('');
    setSavedMoviesIsShort(false);
    setSavedMoviesInutValue('');
    setIsLoggedIn(false);
    setCurrentUser({
      _id: '',
      name: '',
      email: '',
    });
  };

  const handleLogOut = () => {
    resetState();
  };

  const handleCheckToken = useCallback(async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const res = await auth.getCurrentUser(jwt);
        const { _id, name, email } = res;
        setIsLoggedIn(true);
        setCurrentUser({ _id, name, email });
        setMaimApiError('');
      } else {
        resetState();
      }
    } catch (err) {
      console.log(`Ошибка: ${err}`);
      resetState();
    }
  }, [setMaimApiError]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  const handleLogin = useCallback(async ({ email, password }) => {
    setIsFetching(true);
    try {
      const res = await auth.authorize(email, password);
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        handleCheckToken();
      }
    } catch (err) {
      errorHandler(err);
    }
  }, [errorHandler, handleCheckToken, setIsFetching]);

  const handleRegister = useCallback(async ({ name, email, password }) => {
    setIsFetching(true);
    try {
      await auth.register(name, email, password);
      await handleLogin({ email, password });
    } catch (err) {
      errorHandler(err);
    }
  }, [errorHandler, handleLogin, setIsFetching]);

  const handleEditProfile = useCallback(async ({ name, email }) => {
    setIsFetching(true);
    try {
      const userData = await mainApi.editProfile(name, email);
      setCurrentUser({
        name: userData.name,
        email: userData.email,
      });
      setIsInfoTooltipMessage({
        image: fetchIsOk,
        caption: 'Данные успешно изменены',
      });
      setIsInfoToolTipActive(true);
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsFetching(false);
    }
  }, [errorHandler, setIsFetching, setIsInfoToolTipActive, setIsInfoTooltipMessage]);

  useEffect(() => {
    if (!movies && moviesSearchQuery.length > 0) {
      const cachedMovies = JSON.parse(localStorage.getItem('movies'));
      const cachedSearchQuery = localStorage.getItem('moviesSearchQuery');
      const cachedIsShort = JSON.parse(localStorage.getItem('isMoviesIsShort'));

      if (cachedMovies && cachedSearchQuery && cachedIsShort) {
        setMovies(cachedMovies);
        setMoviesSearchQuery(cachedSearchQuery);
        setIsMoviesIsShort(cachedIsShort);
        return;
      }

      setIsLoadingMovies(true);
      moviesApi.getMovies()
        .then((movies) => {
          setMovies(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
        })
        .catch((err) => setSearchError(err))
        .finally(() => setIsLoadingMovies(false));
    }
  }, [movies, moviesSearchQuery, isMoviesIsShort, setSearchError]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('moviesSearchQuery', moviesSearchQuery);
      localStorage.setItem('isMoviesIsShort', JSON.stringify(isMoviesIsShort));
    }
  }, [isLoggedIn, moviesSearchQuery, isMoviesIsShort]);

  const handleAddToFavorites = ({ id, nameRU, nameEN, trailerLink, duration, country, director, year, description, owner, image }) => {
    const isMovieSaved = savedMovies.some((item) => item.movieId === id);
    const movieData = {
      movieId: id,
      nameRU,
      nameEN,
      image: `${moviesApi._baseUrl}${image.url}`,
      trailerLink,
      duration,
      country,
      director,
      year,
      description,
      thumbnail: `${moviesApi._baseUrl}${image.formats.thumbnail.url}`,
      owner,
    };

    const onSaveMovieSuccess = (savedMovie) => {
      setSavedMovies([savedMovie, ...savedMovies]);
    };
    const onDeleteMovieSuccess = () => {
      setSavedMovies((state) => state.filter((item) => item.movieId !== id));
    };
    const onApiError = (err) => {
      console.log(err, err.status, err.message);
    };

    if (!isMovieSaved) {
      mainApi.saveMovie(movieData)
        .then(onSaveMovieSuccess)
        .catch(onApiError);
    } else {
      const savedMovieId = savedMovies.find((item) => item.movieId === id)._id;
      mainApi.deleteMovie(savedMovieId)
        .then(onDeleteMovieSuccess)
        .catch(onApiError);
    }
  };

  const handleRemoveFromFavorites = (movie) => {
    const onDeleteMovieSuccess = () => {
      setSavedMovies((state) => state.filter((item) => item.movieId !== movie.movieId));
    };
    const onApiError = (err) => console.log(err, err.status, err.message);

    mainApi.deleteMovie(movie._id).then(onDeleteMovieSuccess).catch(onApiError);
  };

  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (!isLoggedIn) {
        return;
      }

      try {
        const jwt = 'Bearer ' + localStorage.getItem('jwt');
        const user = currentUser ? currentUser : await auth.getCurrentUser(jwt);
        const savedArray = await mainApi.getSavedMovies(jwt);
        const ourArray = savedArray.filter((movie) => movie.owner === user._id);
        setSavedMovies(ourArray);
      } catch (err) {
        setMaimApiError(err);
        console.log(err);
      }
    };

    fetchSavedMovies();
  }, [isLoggedIn, currentUser, setMaimApiError]);

  const handleOpenMenu = () => {
    setIsMobileMenuActive((prevState) => !prevState);
  };

  const closeModal = useCallback(() => {
    setIsMobileMenuActive(false);
    setIsInfoToolTipActive(false);
  }, [setIsMobileMenuActive, setIsInfoToolTipActive]);

  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [closeModal]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route
          path = "/"
          element = {
            <Main
              isLoggedIn={isLoggedIn}
              isMobileMenuActive={isMobileMenuActive}
              onOpenMenu={handleOpenMenu}
              onClose={closeModal}
            />
          }
        />
        <Route
          path = "/movies"
          element = {
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Movies
                isLoggedIn={isLoggedIn}
                isMobileMenuActive={isMobileMenuActive}
                onOpenMenu={handleOpenMenu}
                onClose={closeModal}
                movies={filterMovies(
                  movies,
                  moviesSearchQuery,
                  isMoviesIsShort
                )}
                searchQuery={moviesSearchQuery}
                setSearchQuery={setMoviesSearchQuery}
                isShort={isMoviesIsShort}
                setIsShort={setIsMoviesIsShort}
                isLoading={isLoadingMovies}
                searchError={searchError}
                inputValue={moviesInputValue}
                setInputValue={setMoviesInputValue}
                savedMovies={savedMovies}
                onCardSave={handleAddToFavorites}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path = "/saved-movies"
          element = {
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedMovies
                isLoggedIn={isLoggedIn}
                isMobileMenuActive={isMobileMenuActive}
                onOpenMenu={handleOpenMenu}
                onClose={closeModal}
                movies={filterMovies(
                  savedMovies,
                  savedMoviesSearchQuery,
                  savedMoviesIsShort
                )}
                setSearchQuery={setSavedMoviesSearchQuery}
                isShort={savedMoviesIsShort}
                setIsShort={setSavedMoviesIsShort}
                inputValue={savedMoviesInputValue}
                setInputValue={setSavedMoviesInutValue}
                onCardDelete={handleRemoveFromFavorites}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path = "/profile"
          element = {
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                isLoggedIn={isLoggedIn}
                isMobileMenuActive={isMobileMenuActive}
                onOpenMenu={handleOpenMenu}
                onClose={closeModal}
                handleLogOut={handleLogOut}
                handleEditProfile={handleEditProfile}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path = "/signin"
          element = {
            <Login
              handleLogin={handleLogin}
              isLoggedIn={isLoggedIn}
              isFetching={isFetching}
            />
          }
        />
        <Route
          path = "/signup"
          element = {
            <Register
              handleRegister={handleRegister}
              isLoggedIn={isLoggedIn}
              isFetching={isFetching}
            />
          }
        />
        <Route
          path = "*"
          element = {
            <NotFound/>
          }
        />
      </Routes>
      <InfoToolTip
          isInfoToolTipActive={isInfoToolTipActive}
          onOpenMenu={handleOpenMenu}
          onClose={closeModal}
          caption={isInfoTooltipMessage.caption}
          image={isInfoTooltipMessage.image}
        />
    </CurrentUserContext.Provider>
  );
};