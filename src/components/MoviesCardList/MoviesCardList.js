import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Error from '../Error/Error';

function MoviesCardList({
  movies,
  getTime,
  onCardSave,
  onCardDelete,
  savedMovies,
}) {
  return (
    <>
      {movies.length === 0 ? (
        <Error>Ничего не найдено</Error>
      ) : (
        <ul className="movies-card-list">
          {movies.map((movie) => {
            return <MoviesCard
              movie={movie}
              key={movie.id ?? movie.movieId}
              getTime={getTime}
              onCardSave={onCardSave}
              onCardDelete={onCardDelete}
              savedMovies={savedMovies}
            />
          })}
        </ul>
      )}
    </>
  );
};

export default React.memo(MoviesCardList);