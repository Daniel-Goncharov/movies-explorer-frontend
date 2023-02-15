import { Link } from 'react-router-dom';
import './AboutMe.css';
import myPhoto from '../../../images/my_photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

export default function AboutMe() {
  return (
    <section id="aboutMe" className="about-me">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__title">Даниил</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик, 32 года</h3>
          <p className="about-me__text">
            Я родился в Москве, закончил факультет психологии РГГУ.
            6 лет занимался разработкой электронных курсов, инструкций и учебных материалов.
            Загружал эту информацию в учебный портал компании, для этого самостоятельно изучил HTML верстку.
            В начале 2022 года решил поменять профессию и стать frontend разработчиком,
            для этого выучился на курсах «Веб разработчик» в Яндекс Практикум.
          </p>
          <Link to="https://github.com/Daniel-Goncharov" target="_blank" className="about-me__link">Github</Link>
        </div>
        <img src={myPhoto} alt="Мое фото" className="about-me__myPhoto"/>
      </div>
      <Portfolio/>
    </section>
  );
};