import "./NavTab.css";
import { Link } from "react-router-dom";

export default function NavTab() {
  return (
  <div className="NavTab">
    <div className="NavTab__container">
      <Link to="#" className="NavTab__link">О проекте</Link>
      <Link to="#" className="NavTab__link">Технологии</Link>
      <Link to="#" className="NavTab__link">Студент</Link>
    </div>
  </div>
  )
}