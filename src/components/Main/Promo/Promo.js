import './Promo.css';
import NavTab from '../NavTab/NavTab';

export default function Promo() {
  return (
  <section className="Promo">
    <div className="Promo__container">
      <h1 className="Promo-title">Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab/>
    </div>
  </section>
  )
}