import './Movies.css'
import Button from '../Button/Button';
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useCallback, useEffect, useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';

export default function Movies({ isLoggedIn, isMobileMenuActive, onOpenMenu, onClose }) {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShortFilter, setIsShortFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [apiError, setApiError] = useState('');
  const togleShortFilter = useCallback(() => {
    setIsShortFilter(!isShortFilter);
  },[isShortFilter, setIsShortFilter]);
  useEffect(() => {
    moviesApi.getMovies(setIsLoading, setApiError).then((movies) => {
      setCurrentMovies(movies);
    })
  },[])
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose}/>
      <main className="movies">
        <SearchForm togleShortFilter={togleShortFilter}/>
        <MoviesCardList isLoading={isLoading} currentMovies={currentMovies} />
        <Button className="movies__button">Ещё</Button>
      </main>
      <Footer/>
    </>
  )
}