import './App.css';
import fetchIsFail from '../../images/Badrequest.svg';
import fetchIsOk from '../../images/Goodrequest.svg';
import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Profile from '../User/Profile/Profile';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../User/Register/Register';
import Login from '../User/Login/Login';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import { auth } from '../../utils/Auth';
import RequireAuth from '../../utils/RequireAuth';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

function App() {
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

  // Функция выхода пользователя
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('beatFilmsMovies');
    localStorage.removeItem('beatFilmsSearchQuery');
    localStorage.removeItem('beatFilmsIsShort');
    setIsLoggedIn(false);
    setCurrentUser({
      _id: '',
      name: '',
      email: '',
    });
  };

  // Открытие меню в хедере
  const handleOpenMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  // Закрытие модальных окон
  const closeModal = () => {
    setIsMobileMenuActive(false);
    setIsInfoToolTipActive(false);
  };

  // Функция закрытия окон по esc
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
          path = '/'
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
          path = '/movies'
          element = {
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Movies
                isLoggedIn={isLoggedIn}
                isMobileMenuActive={isMobileMenuActive}
                onOpenMenu={handleOpenMenu}
                onClose={closeModal}
              />
            </RequireAuth>
          }
        />
        <Route
          path = '/saved-movies'
          element = {
            <RequireAuth isLoggedIn={isLoggedIn}>
              <SavedMovies
                isLoggedIn={isLoggedIn}
                isMobileMenuActive={isMobileMenuActive}
                onOpenMenu={handleOpenMenu}
                onClose={closeModal}
              />
            </RequireAuth>
          }
        />
        <Route
          path = '/profile'
          element = {
            <RequireAuth isLoggedIn={isLoggedIn}>
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
            </RequireAuth>
          }
        />
        <Route
          path = '/signin'
          element = {
            <Login
              handleLogin={handleLogin}
              isLoggedIn={isLoggedIn}
              isFetching={isFetching}
            />
          }
        />
        <Route
          path = '/signup'
          element = {
            <Register
              handleRegister={handleRegister}
              isLoggedIn={isLoggedIn}
              isFetching={isFetching}
            />
          }
        />
        <Route
          path = '*'
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
}

export default App;
