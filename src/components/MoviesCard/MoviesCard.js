import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { moviesApi } from '../../utils/MoviesApi';
import Button from '../Button/Button';
import { getTime } from '../../utils/index';

function MoviesCard({ movie, onCardSave, onCardDelete, savedMovies }) {
  const { pathname } = useLocation();
  const { id, nameRU, duration, trailerLink, image } = movie;

  const isFavorite = savedMovies?.some((item) => item.movieId === id);

  const handleLikeClick = () => {
    onCardSave(movie);
  };

  const handleDeleteClick = () => {
    onCardDelete(movie);
  };

  const renderDeleteButton = () => (
    <Button
      type="button"
      className="movies-card__icon movies-card__icon-delete"
      onClick={handleDeleteClick}
    />
  );

  const renderLikeButton = () => (
    <Button
      type="button"
      className={
        isFavorite
          ? "movies-card__icon movies-card__icon-favorite movies-card__icon-favorite_active"
          : "movies-card__icon movies-card__icon-favorite"
      }
      onClick={handleLikeClick}
    />
  );

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{getTime(duration)}</p>
        </div>
        {pathname === "/saved-movies"
          ? renderDeleteButton()
          : renderLikeButton()}
      </div>
      <Link to={trailerLink} target="_blank" className="movies__link">
        <img
          src={image?.url ? `${moviesApi._baseUrl}${image.url}` : image}
          alt={nameRU}
          className="movies-card__image"
        />
      </Link>
    </li>
  );
}

export default React.memo(MoviesCard);