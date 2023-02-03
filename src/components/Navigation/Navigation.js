import './Navigation.css';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
    {
      isLoggedIn ?
      <nav className="navigation navigation__container_type_loged-in">
        <div className="link-container">
          <Link to="#" className="navigation__link_type_movie">Фильмы</Link>
          <Link to="#" className="navigation__link_type_favorite-movie">Сохранённые фильмы</Link>
        </div>
        <Link to="#" className="navigation__link_type_account">Аккаунт</Link>
      </nav> :
      <nav className="navigation navigation__container_type_loged-out">
        <Link to="#" className="navigation__link_type_signup">Регистрация</Link>
        <Link to="#" className="navigation__link_type_signin">Войти</Link>
      </nav>
    }
    </>
  )
}