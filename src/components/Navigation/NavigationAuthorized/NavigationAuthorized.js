import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationMobile from './NavigationMobile/NavigationMobile';
import './NavigationAuthorized.css';
import { HIGH_RES } from '../../../constants/index';

export default function NavigationAuthorized({ isMobileMenuActive, onOpenMenu, onClose, windowSize }) {
  return (
    windowSize.width > HIGH_RES ?
    <NavigationDesktop />
    :
    <NavigationMobile
      isMobileMenuActive={isMobileMenuActive}
      onOpenMenu={onOpenMenu}
      onClose={onClose}
    />
  );
};