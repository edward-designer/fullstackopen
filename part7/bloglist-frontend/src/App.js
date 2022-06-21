import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Menu from './components/Menu'
import NotFound from './components/NotFound'
import Bloglist from './components/Bloglist'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser([user.username, user.token, user.id])
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu user={user} setUser={setUser} />}>
          <Route
            index
            element={
              user.length === 0 ? (
                <Navigate replace to="/login" />
              ) : (
                <Bloglist user={user} setUser={setUser} />
              )
            }
          />
          <Route
            path="/users"
            element={
              user.length === 0 ? <Navigate replace to="/login" /> : <Users />
            }
          />
          <Route path="/user/:id" element={<User />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
