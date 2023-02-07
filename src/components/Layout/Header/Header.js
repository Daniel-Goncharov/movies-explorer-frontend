import Navigation from '../../Navigation/Navigation';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header({isLoggedIn}) {

  return (
    <header className="header">
      <div className="header_container">
        <Link to="/">
          <div className="header_logo"/>
        </Link>
        <Navigation isLoggedIn={isLoggedIn}/>
      </div>
    </header>
  )
}