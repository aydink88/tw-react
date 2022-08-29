import { NavLink } from 'react-router-dom'

export default function AppNav() {
  const navlinks = [
    { to: '/', text: 'Home' },
    { to: '/explore', text: 'Explore' },
    { to: '/bookmarks', text: 'Bookmarks' }
  ]

  return (
    <nav className="flex space-x-8">
      {navlinks.map((link) => (
        <NavLink
          key={link.to}
          className={({ isActive }) => {
            return isActive ? 'appnavlink applink-active' : 'appnavlink'
          }}
          to={link.to}
        >
          {link.text}
        </NavLink>
      ))}
    </nav>
  )
}
