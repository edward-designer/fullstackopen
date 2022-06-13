import { useState } from 'react'
import authService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser,setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const token =  await authService.logIn(username, password)
      setUser([username,token])
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify({ username,token })
      )
      blogService.setToken(token)
      setUsername('')
      setPassword('')
      setMessage({ type:'success',message:'Login successful' })
    }catch (err) {
      setMessage({ type:'error',message:'Wrong credentials' })
    }
  }

  return(
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="my-2">
          <label>
                    username
            <input
              className="border py-1 px-2 ml-2"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
                    password
            <input
              className="border py-1 px-2 ml-2"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button className="btn-primary" type="submit">login</button>
      </form>
      <p>root salainen</p>
    </>
  )
}

export default Login