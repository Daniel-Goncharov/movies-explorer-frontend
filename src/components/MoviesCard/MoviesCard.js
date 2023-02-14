import './MoviesCard.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import { moviesApi } from '../../utils/MoviesApi';

function MoviesCard({
  movie,
  getTime,
  onCardSave,
  onCardDelete,
  savedMovies
}) {
  let { pathname } = useLocation();

  const isFavorite = savedMovies
    ? savedMovies.some((item) => item.movieId === movie.id)
    : false;

  const handleLikeClick = () => {
    onCardSave(movie);
  };

  const handleDeleteClick = () => {
    onCardDelete(movie);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{ movie.nameRU }</h2>
          <p className="movies-card__duration">{getTime(movie.duration)}</p>
        </div>
        {pathname === '/saved-movies' ? (
          <Button
            type='button'
            className="movies-card__icon movies-card__icon-delete"
            onClick={handleDeleteClick}
          />
        ) : (
          <Button
            type='button'
            className={
              isFavorite
                ? "movies-card__icon movies-card__icon-favorite movies-card__icon-favorite_active"
                : "movies-card__icon movies-card__icon-favorite"
            }
            onClick={handleLikeClick}
          />
        )}
      </div>
      <Link to={movie.trailerLink} target="_blank" className="movies__link">
        <img src={ movie.image.url ? moviesApi._baseUrl + movie.image.url : movie.image } alt={ movie.nameRU } className="movies-card__image"/>
      </Link>
    </li>
  )
}

export default React.memo(MoviesCard);