import React, { useCallback } from 'react';
import './Movies.css';
import Button from '../Button/Button';
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader'
import Error from '../Error/Error';
import useAmountMoviesCards from '../../utils/hooks/useAmountMoviesCards';

function Movies({
  isLoggedIn,
  isMobileMenuActive,
  onOpenMenu,
  onClose,
  movies,
  searchQuery,
  isShort,
  setSearchQuery,
  setIsShort,
  isLoading,
  searchError,
  inputValue,
  setInputValue,
  onCardSave,
  savedMovies,
}) {
  const { amountMoviesCards, hideButtonMore, showMoreMoviesCards } = useAmountMoviesCards(movies, searchQuery, isShort);

  const handleSearchButtonClick = useCallback(
    (input) => {
      setSearchQuery(input);
    },
    [setSearchQuery]
    );

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose}/>
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
                  movies={movies.slice(0, amountMoviesCards)}
                  onCardSave={onCardSave}
                  savedMovies={savedMovies}
                />
                {hideButtonMore && (
                  <Button
                    onClick={showMoreMoviesCards}
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