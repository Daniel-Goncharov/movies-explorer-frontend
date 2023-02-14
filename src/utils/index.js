import { MAX_SHORT_MOVIE_DURATION } from '../constants/index'

// Изменяет формат длинны фильма
export function getTime(minutes) {
  const min = minutes % 60;
  const hour = Math.floor(minutes / 60);
  return hour ? `${hour}ч ${min}м` : `${min}м`;
};

// Фильтрация по поисковому запросу и длинне фильма
export function filterMovies(movies, searchQuery, isShort) {
  if (!movies) {
    return null;
  }
  return movies.filter(
    (movie) =>
      (isShort ? movie.duration <= MAX_SHORT_MOVIE_DURATION : movie) &&
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
  );
};