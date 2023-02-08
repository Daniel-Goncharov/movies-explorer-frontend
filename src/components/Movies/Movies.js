import './Movies.css'
import Button from "../Button/Button";
import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

export default function Movies() {
  return (
    <>
      <Header isLoggedIn={true}/>
      <main className="movies">
        <SearchForm/>
        <MoviesCardList/>
        <Button className="movies__button">Ещё</Button>
      </main>
      <Footer/>
    </>
  )
}