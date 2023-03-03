import { NavLink } from "react-router-dom";
import './NavigationDesktop.css';
import Button from '../../../Button/Button';

export default function NavigationDesktop() {
  return (
    <nav className="navigation navigation__type_authorized-desktop">
      <ul className="navigation__link-list">
        <li>
          <NavLink to="/movies"
            className={({ isActive }) =>
              isActive
                ? "navigation__link-authorized navigation__link-authorized_active"
                : "navigation__link-authorized"
            }
          >
            Фильмы
          </NavLink>
          </li>
        <li>
          <NavLink to="/saved-movies"
            className={({ isActive }) =>
              isActive
                ? "navigation__link-authorized navigation__link-authorized_active"
                : "navigation__link-authorized"
            }
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink to="/profile">
        <Button className="navigation__button-account">
          <span>Аккаунт</span>
        </Button>
      </NavLink>
    </nav>
  );
};