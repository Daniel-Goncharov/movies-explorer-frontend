import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';
import Logo from '../../Logo/Logo';

export default function Header({isLoggedIn}) {
  return (
    <header className="header">
      <div className="header_container">
        <Link to="/">
          <Logo/>
        </Link>
        <Navigation isLoggedIn={isLoggedIn}/>
      </div>
    </header>
  )
}