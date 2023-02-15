import { NavLink } from 'react-router-dom';
import './NavigationMobile.css';
import Hamburger from '../../../Hamburger/Hamburger';
import Button from '../../../Button/Button';

export default function NavigationMobile({ isMobileMenuActive, onOpenMenu, onClose }) {
  return (
    <>
      <Hamburger onClick={onOpenMenu} isMobileMenuActive={isMobileMenuActive}/>
      <div onClick={onClose} className={`cover ${isMobileMenuActive ? "cover_active" : ""}`}/>
      <div onClick={(evt) => evt.stopPropagation()} className={`navigation__container-mobile ${isMobileMenuActive ? "navigation__container-mobile_open" : "navigation__container-mobile_closed"}`}>
        <nav className="navigation navigation__type_authorized-mobile">
          <ul className="navigation__link-list_type_authorized-mobile">
            <li>
              <NavLink to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive
                    ? "navigation__link-authorized-mobile navigation__link-authorized-mobile_active"
                    : "navigation__link-authorized-mobile"
                }
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies"
                onClick={onClose}
                className={({ isActive }) =>
                isActive
                  ? "navigation__link-authorized-mobile navigation__link-authorized-mobile_active"
                  : "navigation__link-authorized-mobile"
              }
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies"
                onClick={onClose}
                className={({ isActive }) =>
                isActive
                  ? "navigation__link-authorized-mobile navigation__link-authorized-mobile_active"
                  : "navigation__link-authorized-mobile"
              }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink to="/profile" onClick={onClose}>
            <Button className="navigation__button-account">
              <span>Аккаунт</span>
            </Button>
          </NavLink>
        </nav>
      </div>
    </>
  );
};