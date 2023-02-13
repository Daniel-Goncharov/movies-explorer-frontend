import './SavedMovies.css'
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({ isLoggedIn, isMobileMenuActive, onOpenMenu, onClose }) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isMobileMenuActive={isMobileMenuActive}
        onOpenMenu={onOpenMenu}
        onClose={onClose}
      />
      <main className="saved-movies">
        <SearchForm/>
        <MoviesCardList/>
      </main>
      <Footer/>
    </>
  )
}