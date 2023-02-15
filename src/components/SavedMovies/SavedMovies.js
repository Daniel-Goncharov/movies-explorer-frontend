import { useCallback } from 'react';
import './SavedMovies.css';
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({
  isLoggedIn,
  isMobileMenuActive,
  onOpenMenu,
  onClose,
  windowSize,
  movies,
  getTime,
  setSearchQuery,
  isShort,
  setIsShort,
  inputValue,
  setInputValue,
  onCardDelete
}) {

  // Отправка поискового запроса
  const handleSearchButtonClick = useCallback(
    (input) => {
      setSearchQuery(input);
    },
    [setSearchQuery]
  );

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isMobileMenuActive={isMobileMenuActive}
        onOpenMenu={onOpenMenu}
        onClose={onClose}
        windowSize={windowSize}
      />
      <main className="saved-movies">
        <SearchForm
          setInputValue={setInputValue}
          inputValue={inputValue}
          isShort={isShort}
          setIsShort={setIsShort}
          onSearch={handleSearchButtonClick}
        />
        {!movies ? null : (
        <MoviesCardList
          movies={movies}
          getTime={getTime}
          onCardDelete={onCardDelete}
        />
      )}
      </main>
      <Footer/>
    </>
  );
};