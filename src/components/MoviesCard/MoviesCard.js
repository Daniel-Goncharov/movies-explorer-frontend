import './MoviesCard.css'
import Button from '../Button/Button';
import { useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { Link } from 'react-router-dom';

export default function MoviesCard({ movie, isSavedMovies = false }) {
  const [isFavorite, setFavorite] = useState(false);
  function addToFavorite() {
    isFavorite ? setFavorite(false) : setFavorite(true);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{ movie.nameRU }</h2>
          <p className="movies-card__duration">{ movie.duration }</p>
        </div>
        <Button type="button" onClick={addToFavorite} className={`
            movies-card__icon
            ${isSavedMovies ? "movies-card__icon-delete"
                            : isFavorite
                            ? "movies-card__icon-favorite movies-card__icon-favorite_active"
                            : "movies-card__icon-favorite"}
          `}/>
      </div>
      <Link to={movie.trailerLink} target="_blank" className="movies__link">
        <img src={ movie.image.url ? moviesApi._baseUrl + movie.image.url : movie.image } alt={ movie.nameRU } className="movies-card__image"/>
      </Link>
    </li>
  )
}