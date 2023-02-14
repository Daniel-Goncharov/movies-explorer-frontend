import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationMobile from './NavigationMobile/NavigationMobile';
import './NavigationAuthorized.css';

export default function NavigationAuthorized({ isMobileMenuActive, onOpenMenu, onClose, windowSize }) {


  return (
    windowSize.width > 768 ? <NavigationDesktop /> : <NavigationMobile isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose}/>
  )
}