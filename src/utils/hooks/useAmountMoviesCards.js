import { useState, useEffect, useCallback } from 'react';
import {
  HIGH_RES,
  LOW_RES,
  DESKTOP_NUM_OF_MOVIES,
  TABLET_NUM_OF_MOVIES,
  MOBILE_NUM_OF_MOVIES,
  DESKTOP_NUM_OF_MORE_MOVIES,
  TABLET_NUM_OF_MORE_MOVIES,
} from '../../constants/index';
import useWindowSize from '../../vendor/hooks/useWindowSize';

export default function useAmountMoviesCards(movies, searchQuery, isShort) {
  const windowSize = useWindowSize();
  const [amountMoviesCards, setAmountMoviesCards] = useState(0);
  const hideButtonMore = movies && amountMoviesCards >= movies.length ? false : true;

  const showMoviesCards = useCallback(() => {
    if (windowSize.width > HIGH_RES) {
      setAmountMoviesCards(DESKTOP_NUM_OF_MOVIES);
    } else if (windowSize.width < LOW_RES) {
      setAmountMoviesCards(MOBILE_NUM_OF_MOVIES);
    } else {
      setAmountMoviesCards(TABLET_NUM_OF_MOVIES);
    }
  }, [windowSize.width]);

  const showMoreMoviesCards = () => {
    const numOfMovies = windowSize.width > HIGH_RES
      ? amountMoviesCards + DESKTOP_NUM_OF_MORE_MOVIES
      : amountMoviesCards + TABLET_NUM_OF_MORE_MOVIES;
    setAmountMoviesCards(numOfMovies);
  };

  useEffect(() => {
    if (searchQuery.length || isShort) {
      showMoviesCards();
    }
  }, [searchQuery, isShort, showMoviesCards]);

  return {
    amountMoviesCards,
    setAmountMoviesCards,
    hideButtonMore,
    showMoviesCards,
    showMoreMoviesCards,
  }
}