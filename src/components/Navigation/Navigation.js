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
        <ul className="navigation__link-list">
          <li>
            <Link to="#" className="navigation__link-loged-in">Фильмы</Link>
            </li>
          <li>
            <Link to="#" className="navigation__link-loged-in">Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link to="#" className="navigation__linkloged-in_type_account">Аккаунт</Link>
      </nav> :
      <nav className="navigation navigation__container_type_loged-out">
        <Link to="#" className="navigation__link-loged-out">Регистрация</Link>
        <Link to="#" className="navigation__button-signin">Войти</Link>
      </nav>
    }
    </>
  )
}
