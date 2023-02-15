import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../../Navigation/Navigation';
import Logo from '../../Logo/Logo';

export default function Header({ isLoggedIn, isMobileMenuActive, onOpenMenu, onClose, windowSize }) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <Logo/>
        </Link>
        <Navigation isLoggedIn={isLoggedIn} isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose} windowSize={windowSize}/>
      </div>
    </header>
  );
};