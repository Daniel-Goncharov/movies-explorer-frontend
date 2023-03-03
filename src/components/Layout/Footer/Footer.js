import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__decoration-line"></div>
      <div className="footer__container">
        <p className="copyright">&copy; {new Date().getFullYear()} Daniil Goncharov</p>
        <ul className="footer__links">
          <li className="links-item">
            <Link to="https://practicum.yandex.ru" className="footer__link" target="_blank">Яндекс.Практикум</Link>
          </li>
          <li className="links-item">
            <Link to="https://github.com/Daniel-Goncharov" className="footer__link" target="_blank">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};