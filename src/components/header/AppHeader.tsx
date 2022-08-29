import AppNav from './AppNav'
import UserHeaderMenu from './UserHeaderMenu'
import TweeterLogo from 'public/img/tweeter.svg'
import { Link, useLocation } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'

export default function AppHeader() {
  const location = useLocation()
  const isHidden = location.pathname.startsWith('/auth')
  return (
    <div>
      {!isHidden && (
        <header className="flex justify-between items-center px-2 lg:px-16 bg-base-100">
          <div>
            <Link to="/">
              <img src={TweeterLogo} alt="tweeter" />
            </Link>
          </div>
          <div className="hidden md:block">
            <AppNav />
          </div>
          <div className="flex items-center">
            <UserHeaderMenu />
            <ThemeSelector />
          </div>
        </header>
      )}
    </div>
  )
}
