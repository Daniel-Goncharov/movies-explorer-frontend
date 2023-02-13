import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ isLoading, currentMovies, isSavedMovies = false }) {
  return (
    isLoading ? '' :
    <ul className="movies-card-list">
      {currentMovies.map((item, index) => {
        return <MoviesCard movie={item} key={index} isSavedMovies={isSavedMovies} />;
      })}
    </ul>
  );
};
