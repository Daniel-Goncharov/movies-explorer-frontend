import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationMobile from './NavigationMobile/NavigationMobile';
import './NavigationAuthorized.css';
import { HIGH_RES } from '../../../constants/index';
import useWindowSize from '../../../vendor/hooks/useWindowSize';

export default function NavigationAuthorized({ isMobileMenuActive, onOpenMenu, onClose}) {
  const windowSize = useWindowSize();
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