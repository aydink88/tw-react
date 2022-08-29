import GroupIcon from 'components/Icon/GroupIcon'
import LogoutIcon from 'components/Icon/LogoutIcon'
import SettingsIcon from 'components/Icon/SettingsIcon'
import UserIcon from 'components/Icon/UserIcon'
import { defaultAvatar } from 'config'
import { Link } from 'react-router-dom'
import { useAppContext } from 'state/AppContext'

export default function UserHeaderMenu() {
  const { dispatch } = useAppContext()
  const {
    state: { user }
  } = useAppContext()
  const listItems = [
    {
      src: UserIcon,
      alt: 'user',
      text: 'My Profile',
      link: `/profile/${user ? user.handle : ''}`
    },
    {
      src: GroupIcon,
      alt: 'group',
      text: 'Group Chat',
      link: `/profile/${user ? user.handle : ''}`
    },
    {
      src: SettingsIcon,
      alt: 'settings',
      text: 'Settings',
      link: `/profile/${user ? user.handle : ''}`
    }
    // {
    //   src: LogoutIcon,
    //   alt: 'logout',
    //   text: 'logout',
    //   link: `/profile/${user ? user.handle : ''}`
    // }
  ]
  const size = 30

  const logout = () => {
    dispatch({ type: 'resetState', payload: undefined })
    localStorage.clear()
    location.assign('/auth')
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="flex items-center m-1 cursor-pointer">
        <img
          src={user.avatar || defaultAvatar}
          className="mask mask-squircle"
          height={size}
          width={size}
        />
        <span>{user.handle}</span>
        <span>&#9662;</span>
      </div>
      <ul tabIndex={0} className="p-2 w-52 shadow menu dropdown-content bg-base-100 rounded-box">
        {listItems.map((item) => (
          <li className="flex flex-row justify-center" key={item.text}>
            <Link to={item.link}>
              <item.src size={size} />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
        <li className="flex flex-row justify-center">
          <div onClick={logout}>
            <LogoutIcon size={size} />
            <span>logout</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
