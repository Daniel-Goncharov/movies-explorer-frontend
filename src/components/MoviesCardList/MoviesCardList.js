import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import { demoCard } from '../../utils/constant';

export default function MoviesCardList({ isSavedMovies = false }) {
  return (
    <ul className="movies-card-list">
      {demoCard.map((item, index) => {
        return <MoviesCard card={item} key={index} isSavedMovies={isSavedMovies} />;
      })}
    </ul>
  );
};
