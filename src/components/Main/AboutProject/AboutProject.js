import './AboutProject.css';

export default function AboutProject() {
  return (
    <section id="aboutProject" className="about-project">
      <h2 className="section__title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__description">
          <div className="about-project__paragraph">
            <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__paragraph">
            <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="plan-project">
          <p className="plan-project__time plan-project__time_type_green">1 неделя</p>
          <p className="plan-project__time">4 недели</p>
          <p className="plan-project__task">Back-end</p>
          <p className="plan-project__task">Front-end</p>
        </div>
      </div>
    </section>
  );
};
