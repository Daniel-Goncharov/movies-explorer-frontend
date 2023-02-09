import './NavTab.css';

export default function NavTab() {
  return (
  <nav className="navTab">
    <ul className="navTab__list">
      <li className="navTab__list-item">
        <a href="#aboutProject" className="navTab__link">О проекте</a>
      </li>
      <li className="navTab__list-item">
        <a href="#techs" className="navTab__link">Технологии</a>
      </li>
      <li className="navTab__list-item">
        <a href="#aboutMe" className="navTab__link">Студент</a>
      </li>
    </ul>
  </nav>
  )
}
