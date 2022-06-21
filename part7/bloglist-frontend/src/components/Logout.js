import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationSlice'

const Logout = ({ setUser }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser([])
    dispatch(
      setNotification({ type: 'success', message: 'Successfully logged out' })
    )
  }

  return (
    <button
      onClick={handleLogout}
      className="btn-primary mt-0 ml-4"
      type="button"
    >
      logout
    </button>
  )
}

export default Logout
