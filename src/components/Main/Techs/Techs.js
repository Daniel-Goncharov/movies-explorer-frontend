import './Techs.css'

export default function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="section__title">Технологии</h2>
      <div className="techs__container">
        <h2 className="techs__title">7 технологий</h2>
        <p className="thechs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="stack-list">
            <li className="stack-list__item">HTML</li>
            <li className="stack-list__item">CSS</li>
            <li className="stack-list__item">JS</li>
            <li className="stack-list__item">React</li>
            <li className="stack-list__item">GIT</li>
            <li className="stack-list__item">Express.js</li>
            <li className="stack-list__item">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}