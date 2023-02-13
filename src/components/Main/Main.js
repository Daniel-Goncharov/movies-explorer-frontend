import './Main.css';
import Header from '../Layout/Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Layout/Footer/Footer';


export default function Main({ isLoggedIn, isMobileMenuActive, onOpenMenu, onClose }) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isMobileMenuActive={isMobileMenuActive}
        onOpenMenu={onOpenMenu}
        onClose={onClose}
      />
      <main className="main">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
      </main>
      <Footer/>
    </>
  )
}