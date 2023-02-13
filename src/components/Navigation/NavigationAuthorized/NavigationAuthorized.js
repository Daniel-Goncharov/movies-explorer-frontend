import useWindowSize from '../../../vendor/hooks/useWindowSize';
import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationMobile from './NavigationMobile/NavigationMobile';
import './NavigationAuthorized.css';

export default function NavigationAuthorized({ isMobileMenuActive, onOpenMenu, onClose }) {
  const windowSize = useWindowSize();

  return (
    windowSize.width > 768 ? <NavigationDesktop /> : <NavigationMobile isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose}/>
  )
}