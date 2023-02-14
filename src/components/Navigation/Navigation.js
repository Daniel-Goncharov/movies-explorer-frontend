import NavigationAuthorized from './NavigationAuthorized/NavigationAuthorized';
import NavigationUnauthorized from './NavigationUnauthorized/NavigationUnauthorized';

export default function Navigation({ isLoggedIn, isMobileMenuActive, onOpenMenu, onClose, windowSize }) {

  return (
    <>
    {
      isLoggedIn ?
      <NavigationAuthorized isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose} windowSize={windowSize}/> :
      <NavigationUnauthorized/>
    }
    </>
  )
}
