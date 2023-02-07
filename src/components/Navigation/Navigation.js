import NavigationAuthorized from './NavigationAuthorized/NavigationAuthorized';
import NavigationUnauthorized from './NavigationUnauthorized/NavigationUnauthorized';

export default function Navigation({isLoggedIn}) {

  return (
    <>
    {
      isLoggedIn ?
      <NavigationAuthorized/> :
      <NavigationUnauthorized/>
    }
    </>
  )
}
