import './MoviesCard.css'
import Button from '../Button/Button';
import { useState } from 'react';

export default function MoviesCard({ card, isSavedMovies = false }) {
  const [isFavorite, setFavorite] = useState(false);
  function addToFavorite() {
    isFavorite ? setFavorite(false) : setFavorite(true);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{ card.nameRU }</h2>
          <p className="movies-card__duration">{ card.duration }</p>
        </div>
        <Button type="button" onClick={addToFavorite} className={`
            movies-card__icon
            ${isSavedMovies ? "movies-card__icon-delete"
                            : isFavorite
                            ? "movies-card__icon-favorite movies-card__icon-favorite_active"
                            : "movies-card__icon-favorite"}
          `}/>
      </div>
      <img src={ card.thumbnail } alt={ card.nameRU } className="movies-card__image"/>
    </li>
  )
}