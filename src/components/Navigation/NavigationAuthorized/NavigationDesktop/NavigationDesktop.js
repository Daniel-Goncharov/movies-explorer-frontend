import './NavigationDesktop.css';
import { Link } from "react-router-dom";

export default function NavigationDesktop() {

  return (
    <nav className="navigation navigation__type_authorized-desktop">
      <ul className="navigation__link-list">
        <li>
          <Link to="/movies" className="navigation__link-authorized">Фильмы</Link>
          </li>
        <li>
          <Link to="/saved-movies" className="navigation__link-authorized">Сохранённые фильмы</Link>
        </li>
      </ul>
      <Link to="#" className="navigation__button-account">Аккаунт</Link>
    </nav>
  )
}