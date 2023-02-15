import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Movies.css';
import {
  HIGH_RES,
  LOW_RES,
  DESKTOP_NUM_OF_MOVIES,
  TABLET_NUM_OF_MOVIES,
  MOBILE_NUM_OF_MOVIES,
  DESKTOP_NUM_OF_MORE_MOVIES,
  TABLET_NUM_OF_MORE_MOVIES,
} from '../../constants/index';
import Button from '../Button/Button';
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader'
import Error from '../Error/Error';

function Movies({
  isLoggedIn,
  isMobileMenuActive,
  onOpenMenu,
  onClose,
  windowSize,
  movies,
  getTime,
  searchQuery,
  setSearchQuery,
  isShort,
  setIsShort,
  isLoading,
  searchError,
  inputValue,
  setInputValue,
  onCardSave,
  savedMovies,
}) {
  const [defaultMoviesCards, setDefaultMoviesCards] = useState(0);

  // Определяет каличество карточек для показа
  const moviesCards = useCallback(() => {
    if (windowSize.width > HIGH_RES) {
      setDefaultMoviesCards(DESKTOP_NUM_OF_MOVIES);
    } else if (windowSize.width < LOW_RES) {
      setDefaultMoviesCards(MOBILE_NUM_OF_MOVIES);
    } else {
      setDefaultMoviesCards(TABLET_NUM_OF_MOVIES);
    }
  }, [windowSize.width]);

  // Определяет количество карточек по нажатию на кнопку Ещё
  const showMoreMovies = () => {
    if (windowSize.width > HIGH_RES) {
      setDefaultMoviesCards(defaultMoviesCards + DESKTOP_NUM_OF_MORE_MOVIES);
    } else {
      setDefaultMoviesCards(defaultMoviesCards + TABLET_NUM_OF_MORE_MOVIES);
    }
  };

  // Изменяет выдачу карточек после каждого поискового запроса
  useEffect(() => {
    if (searchQuery.length || isShort) {
      moviesCards();
    }
  }, [searchQuery, isShort, moviesCards]);

  // Логика скрытия кнопки Ещё
  const isButtonMoreHidden = useMemo(() => {
    if (movies === null) {
      return false;
    }
    if (defaultMoviesCards >= movies.length) {
      return false;
    } else {
      return true;
    }
  }, [movies, defaultMoviesCards]);

  // Отправка поискового запроса
  const handleSearchButtonClick = useCallback(
    (input) => {
      setSearchQuery(input);
    },
    [setSearchQuery]
  );

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose} windowSize={windowSize}/>
      <main className="movies">
        <SearchForm
          isShort={isShort}
          setIsShort={setIsShort}
          onSearch={handleSearchButtonClick}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        {searchError && (
          <Error>Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.</Error>
        )}
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {!movies ? null : (
              <>
                <MoviesCardList
                  movies={movies.slice(0, defaultMoviesCards)}
                  getTime={getTime}
                  onCardSave={onCardSave}
                  savedMovies={savedMovies}
                />
                {isButtonMoreHidden && (
                  <Button
                    onClick={showMoreMovies}
                    className="movies__button"
                  >
                    Ещё
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </main>
      <Footer/>
    </>
  );
};

export default React.memo(Movies);