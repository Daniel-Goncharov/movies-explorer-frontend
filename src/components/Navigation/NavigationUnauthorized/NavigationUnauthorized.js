import './NavigationUnauthorized.css';
import { Link } from "react-router-dom";

export default function NavigationUnauthorized() {

  return (
    <nav className="navigation navigation_type_unauthorized">
      <Link to="#" className="navigation__link-unauthorized">Регистрация</Link>
      <Link to="#" className="navigation__button-signin">Войти</Link>
    </nav>
  )
}