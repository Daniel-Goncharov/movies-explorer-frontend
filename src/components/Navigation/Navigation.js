import NavigationAuthorized from './NavigationAuthorized/NavigationAuthorized';
import NavigationUnauthorized from './NavigationUnauthorized/NavigationUnauthorized';

export default function Navigation({ isLoggedIn, isMobileMenuActive, onOpenMenu, onClose }) {

  return (
    <>
    {
      isLoggedIn ?
      <NavigationAuthorized isMobileMenuActive={isMobileMenuActive} onOpenMenu={onOpenMenu} onClose={onClose}/> :
      <NavigationUnauthorized/>
    }
    </>
  )
}
