import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import fetchIsFail from '../../images/Badrequest.svg';
import fetchIsOk from '../../images/Goodrequest.svg';
import useWindowSize from '../../vendor/hooks/useWindowSize';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { getTime, filterMovies } from '../../utils/index';
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
  const windowSize = useWindowSize();
  const [beatFilmsMovies, setBeatFilmsMovies] = useState(null);
  const [beatFilmsSearchQuery, setBeatFilmsSearchQuery] = useState(
    localStorage.getItem('beatFilmsSearchQuery') ?? ''
  );
  const [beatFilmsIsShort, setBeatFilmsIsShort] = useState(
    JSON.parse(localStorage.getItem('beatFilmsIsShort')) ?? false
  );
  const [beatFilmsInputValue, setBeatFilmsInputValue] = useState(
    localStorage.getItem('beatFilmsSearchQuery') ?? ''
  );

  const [savedMovies, setSavedMovies] = useState(null);
  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = useState('');
  const [savedMoviesIsShort, setSavedMoviesIsShort] = useState(false);
  const [savedMoviesInputValue, setSavedMoviesInutValue] = useState('');
  const [isLoadingBeatFilms, setIsLoadingBeatFilms] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoToolTipActive, setIsInfoToolTipActive] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState({
    image: '',
    caption: '',
  });

  // Запрос всех фильмов из сервера BeatFilms
  useEffect(() => {
    if (
      !beatFilmsMovies &&
      beatFilmsSearchQuery.length > 0
    ) {
      if ('beatFilmsMovies' in localStorage) {
        setBeatFilmsMovies(JSON.parse(localStorage.getItem('beatFilmsMovies')));
        setBeatFilmsSearchQuery(localStorage.getItem('beatFilmsSearchQuery'));
        setBeatFilmsIsShort(
          JSON.parse(localStorage.getItem('beatFilmsIsShort'))
        );
      } else {
        setIsLoadingBeatFilms(true);
        moviesApi
          .getMovies()
          .then((movies) => {
            setBeatFilmsMovies(movies);
            localStorage.setItem('beatFilmsMovies', JSON.stringify(movies));
          })
          .catch((err) => setSearchError(err))
          .finally(() => setIsLoadingBeatFilms(false));
      }
    }
  }, [beatFilmsMovies, beatFilmsSearchQuery, beatFilmsIsShort]);

  // Запись данных запроса и чекбокса в localStorage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('beatFilmsSearchQuery', beatFilmsSearchQuery);
      localStorage.setItem(
        'beatFilmsIsShort',
        JSON.stringify(beatFilmsIsShort)
      );
    }
  }, [isLoggedIn, beatFilmsSearchQuery, beatFilmsIsShort]);

  // Обработчик клика добавления в избранное
  const handleAddToFavoritesClick = (movie) => {
    const isMovieSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isMovieSaved) {
      mainApi
        .saveMovie({
          movieId: movie.id,
          nameRU: movie.nameRU,
          image: moviesApi._baseUrl + movie.image.url,
          trailerLink: movie.trailerLink,
          duration: movie.duration,
          country: movie.country,
          director: movie.director,
          year: movie.year,
          description: movie.description,
          thumbnail: moviesApi._baseUrl + movie.image.formats.thumbnail.url,
          owner: movie.owner,
          nameEN: movie.nameEN,
        })
        .then((savedMovie) => setSavedMovies([savedMovie, ...savedMovies]))
        .catch((err) => console.log(err, err.status, err.message));
    } else {
      const savedMovieId = savedMovies.find(
        (item) => item.movieId === movie.id
      )._id;
      mainApi
        .deleteMovie(savedMovieId)
        .then(() => {
          setSavedMovies((state) =>
            state.filter((item) => item.movieId !== movie.id)
          );
        })
        .catch((err) => console.log(err, err.status, err.message));
    }
  };

  // Обработчик клика удаления из избранного
  const handleRemoveFromFavoritesClick = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item.movieId !== movie.movieId)
        );
      })
      .catch((err) => console.log(err, err.status, err.message));
  };

  // Запрос фильмов добавленых в избранное
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then((movies) => setSavedMovies(movies.reverse()))
        .catch((err) => setSearchError(err));
    }
  }, [isLoggedIn]);

  // Проверка токена
  const handleCheckToken = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      setSearchError('');
      auth
        .getCurrentUser(jwt)
        .then((res) => {
          const { _id, name, email } = res;
          setIsLoggedIn(true);
          setCurrentUser({ _id, name, email });
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          if (err === 401) {
            handleLogOut();
          }
        });
    } else {
      handleLogOut();
    }
  }, []);

  // Проверка выполнял ли пользователь вход ранее
  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  // Регистрация пользователя
  const handleRegister = ({ name, email, password }) => {
    setIsFetching(true);
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipMessage({
          image: '',
          caption: '',
        });
        setIsFetching(false);
        setIsInfoToolTipActive(true);
        if (err === 409) {
          setIsInfoTooltipMessage({
            image: fetchIsFail,
            caption: 'Пользователь с указанной почтой уже существует',
          });
        }
        if (err === 500) {
          setIsInfoTooltipMessage({
            image: fetchIsFail,
            caption: 'Ошибка сервера, попробуйте ещё раз чуть позже',
          });
        }
      });
  };

  // Вход на сайт
  const handleLogin = ({ email, password }) => {
    setIsFetching(true);
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleCheckToken();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipMessage({
          image: '',
          caption: '',
        });
        setIsFetching(false);
        setIsInfoToolTipActive(true);
        if (err === 401) {
          setIsInfoTooltipMessage({
            image: fetchIsFail,
            caption: 'Почта или пароль не верные',
          });
        }
        if (err === 400) {
          setIsInfoTooltipMessage({
            image: fetchIsFail,
            caption: 'Пользователя с такой почтой не существует',
          });
        }
        if (err === 500) {
          setIsInfoTooltipMessage({
            image: fetchIsFail,
            caption: 'Ошибка сервера, попробуйте ещё раз чуть позже',
          });
        }
      });
  };

  // Редактирование информации о пользователе
  const handleEditProfile = ({ name, email }) => {
    setIsFetching(true);
    mainApi
      .editProfile(name, email)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          email: userData.email,
        });
        setIsInfoTooltipMessage({
          image: '',
          caption: '',
        });
        setIsInfoToolTipActive(true);
        setIsInfoTooltipMessage({
          image: fetchIsOk,
          caption: 'Данные успешно изменены',
        });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipMessage({
          image: '',
          caption: '',
        });

        setIsInfoToolTipActive(true);
        if (err === 409) {
          setIsInfoTooltipMessage({
            image: fetchIsFail,
            caption: 'Пользователь с указанной почтой уже существует',
          });
        }
      })
      .finally(() => setIsFetching(false));
  };

  // Выход пользователя и отчистка данных из localStorage
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('beatFilmsMovies');
    localStorage.removeItem('beatFilmsSearchQuery');
    localStorage.removeItem('beatFilmsIsShort');
    setBeatFilmsMovies(null);
    setBeatFilmsSearchQuery('');
    setBeatFilmsIsShort(false);
    setBeatFilmsInputValue('');
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

  // Управление состоянием навигационного меню в мобильных разрешениях
  const handleOpenMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  // Закрытие всех модальных окон
  const closeModal = () => {
    setIsMobileMenuActive(false);
    setIsInfoToolTipActive(false);
  };

  // Закрытия окон с помощью esc
  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, []);

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
              windowSize={windowSize}
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
                windowSize={windowSize}
                movies={filterMovies(
                  beatFilmsMovies,
                  beatFilmsSearchQuery,
                  beatFilmsIsShort
                )}
                getTime={getTime}
                isLoading={isLoadingBeatFilms}
                searchQuery={beatFilmsSearchQuery}
                setSearchQuery={setBeatFilmsSearchQuery}
                isShort={beatFilmsIsShort}
                setIsShort={setBeatFilmsIsShort}
                searchError={searchError}
                inputValue={beatFilmsInputValue}
                setInputValue={setBeatFilmsInputValue}
                savedMovies={savedMovies}
                onCardSave={handleAddToFavoritesClick}
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
                windowSize={windowSize}
                movies={filterMovies(
                  savedMovies,
                  savedMoviesSearchQuery,
                  savedMoviesIsShort
                )}
                getTime={getTime}
                setSearchQuery={setSavedMoviesSearchQuery}
                isShort={savedMoviesIsShort}
                setIsShort={setSavedMoviesIsShort}
                inputValue={savedMoviesInputValue}
                setInputValue={setSavedMoviesInutValue}
                onCardDelete={handleRemoveFromFavoritesClick}
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
                windowSize={windowSize}
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