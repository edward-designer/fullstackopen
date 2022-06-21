import { NavLink, Outlet } from 'react-router-dom'

import Logout from './Logout'

import Notification from './Notification'

const Menu = ({ user, setUser }) => (
  <div className="m-4 max-w-2xl mx-auto">
    <div className="flex border-b">
      <h1 className="flex-auto text-4xl font-bold text-cyan-900 pb-2 my-4">
        Bloglist
      </h1>
      <nav className="child:p-4">
        <NavLink className="hover:text-orange-700" to="/">
          Blog List
        </NavLink>
        <NavLink className="hover:text-orange-700" to="/users">
          Users
        </NavLink>
        {user.length === 0 ? (
          <NavLink className="hover:text-orange-700" to="/login">
            Login
          </NavLink>
        ) : (
          <Logout setUser={setUser} />
        )}
      </nav>
    </div>
    <Notification />
    <Outlet />
  </div>
)

export default Menu
