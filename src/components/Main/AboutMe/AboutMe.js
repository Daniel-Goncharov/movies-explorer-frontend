import './AboutMe.css';
import { Link } from 'react-router-dom';
import myPhoto from '../../../images/my_photo.png';
import Portfolio from '../Portfolio/Portfolio';

export default function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__title">Виталий</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h3>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link to="https://github.com/Daniel-Goncharov" target="_blank" className="about-me__link">Github</Link>
        </div>
        <img src={myPhoto} alt="Мое фото" className="about-me__myPhoto"/>
      </div>
      <Portfolio/>
    </section>
  )
}
