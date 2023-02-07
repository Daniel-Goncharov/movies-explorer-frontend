import useWindowSize from '../../../vendor/hooks/useWindowSize';
import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationMobile from './NavigationMobile/NavigationMobile';

export default function NavigationAuthorized() {
  const windowSize = useWindowSize();

  return (
    windowSize.width > 768 ? <NavigationDesktop/> : <NavigationMobile/>
  )
}