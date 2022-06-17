const Logout = ({ setUser,setMessage }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser([])
    setMessage({ type:'success',message:'Successfully logged out' })
  }

  return(
    <button onClick={handleLogout} className="btn-primary mt-0 ml-4" type="button">logout</button>
  )
}

export default Logout