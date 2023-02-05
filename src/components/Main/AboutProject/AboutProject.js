import './AboutProject.css';

export default function AboutProject() {
  return (
    <section id="aboutProject" className='aboutProject'>
      <h2 className='section__title'>О проекте</h2>
      <div className='aboutProject__container'>
        <div className='aboutProject__description'>
          <div className='aboutProject__paragraph'>
            <h3 className='aboutProject__title'>Дипломный проект включал 5 этапов</h3>
            <p className='aboutProject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='aboutProject__paragraph'>
            <h3 className='aboutProject__title'>На выполнение диплома ушло 5 недель</h3>
            <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='planProject'>
          <p className='planProject__time planProject__time_type_green'>1 неделя</p>
          <p className='planProject__time'>4 недели</p>
          <p className='planProject__task'>Back-end</p>
          <p className='planProject__task'>Front-end</p>
        </div>
      </div>
    </section>
  )
}
