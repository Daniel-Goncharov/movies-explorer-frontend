import './NavTab.css';

export default function NavTab() {
  return (
  <nav className="nav-tab">
    <ul className="nav-tab__list">
      <li className="nav-tab__list-item">
        <a href="#aboutProject" className="nav-tab__link">О проекте</a>
      </li>
      <li className="nav-tab__list-item">
        <a href="#techs" className="nav-tab__link">Технологии</a>
      </li>
      <li className="nav-tab__list-item">
        <a href="#aboutMe" className="nav-tab__link">Студент</a>
      </li>
    </ul>
  </nav>
  );
};