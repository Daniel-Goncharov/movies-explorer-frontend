import Navigation from "../../Navigation/Navigation";
import './Header.css';

export default function Header() {


  return (
    <header className="header">
      <div className="header_container">
        <div className="header_logo"/>
        <Navigation></Navigation>
      </div>
    </header>
  )
}