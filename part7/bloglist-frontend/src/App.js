import { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser([user.username, user.token, user.id])
      blogService.setToken(user.token)
    }
  },[])

  return (
    <div className="m-4 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-cyan-900 pb-2 my-4 border-b">Bloglist</h1>
      <Notification message={message} setMessage={setMessage} />

      {user.length===0?
        <Login setUser={setUser} setMessage={setMessage} /> :
        <Bloglist user={user} setUser={setUser} setMessage={setMessage} />
      }
    </div>

  )
}

export default App
