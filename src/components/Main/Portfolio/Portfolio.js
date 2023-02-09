import './Portfolio.css'
import { Link } from 'react-router-dom';

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link to="https://github.com/Daniel-Goncharov/how-to-learn" target="_blank" className="portfolio__project-link">
            <h3 className="portfolio__link-title">Статичный сайт</h3>
            <div className="portfolio__link-arrow">↗</div>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link to="https://github.com/Daniel-Goncharov/russian-travel" target="_blank" className="portfolio__project-link">
            <h3 className="portfolio__link-title">Адаптивный сайт</h3>
            <div className="portfolio__link-arrow">↗</div>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link to="https://github.com/Daniel-Goncharov/react-mesto-api-full" target="_blank" className="portfolio__project-link">
            <h3 className="portfolio__link-title">Одностраничное приложение</h3>
            <div className="portfolio__link-arrow">↗</div>
          </Link>
        </li>
      </ul>
    </div>
  )
}
