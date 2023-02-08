import './NavigationDesktop.css';
import { Link } from "react-router-dom";
import Button from '../../../Button/Button';

export default function NavigationDesktop() {
  return (
    <nav className="navigation navigation__type_authorized-desktop">
      <ul className="navigation__link-list">
        <li>
          <Link to="/movies" className="navigation__link-authorized navigation__link-authorized_active">Фильмы</Link>
          </li>
        <li>
          <Link to="/saved-movies" className="navigation__link-authorized">Сохранённые фильмы</Link>
        </li>
      </ul>
      <Link to="#">
        <Button className="navigation__button-account">
          <span>Аккаунт</span>
        </Button>
      </Link>
    </nav>
  )
}