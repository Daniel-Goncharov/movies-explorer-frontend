import './NavigationUnauthorized.css';
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
export default function NavigationUnauthorized() {

  return (
    <nav className="navigation navigation_type_unauthorized">
      <Link to="#" className="navigation__link-unauthorized">Регистрация</Link>
      <Link to="/movies">
        <Button className="navigation__button-signin">
          <span>Войти</span>
        </Button>
      </Link>
    </nav>
  )
}