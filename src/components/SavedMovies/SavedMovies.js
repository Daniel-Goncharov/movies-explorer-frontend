import './SavedMovies.css'
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies() {
  return (
    <>
      <Header isLoggedIn={true}/>
      <main className="saved-movies">
        <SearchForm/>
        <MoviesCardList isSavedMovies={true}/>
      </main>
      <Footer/>
    </>
  )
}