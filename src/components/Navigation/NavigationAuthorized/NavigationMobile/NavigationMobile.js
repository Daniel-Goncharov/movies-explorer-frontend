import './NavigationMobile.css';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../../../Hamburger/Hamburger';

export default function NavigationMobile() {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const hamburgerOnClick = useCallback(() => {
    setIsHamburgerActive(!isHamburgerActive);
  },[isHamburgerActive, setIsHamburgerActive]);

  return (
    <>
      <Hamburger onClick={hamburgerOnClick} isActive={isHamburgerActive}/>
      <div className={`cover ${isHamburgerActive ? 'cover_active' : ''}`}/>
      <div className={`navigation__container-mobile ${isHamburgerActive ? 'navigation__container-mobile_open' : 'navigation__container-mobile_closed'}`}>
        <nav className="navigation navigation__type_authorized-mobile">
          <ul className="navigation__link-list_type_authorized-mobile">
            <li>
              <Link to="/movies" className="navigation__link-authorized-mobile">Главная</Link>
            </li>
            <li>
              <Link to="/movies" className="navigation__link-authorized-mobile navigation__link-authorized-mobile_active">Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className="navigation__link-authorized-mobile">Сохранённые фильмы</Link>
            </li>
          </ul>
          <Link to="#" className="navigation__button-account">Аккаунт</Link>
        </nav>
      </div>
    </>
  )
}