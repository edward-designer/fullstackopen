import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Logout from './Logout'
import AddBlog from './AddBlog'
import Togglable from './Togglable'

const Bloglist = ({ user, setUser, setMessage }) => {
  const [blogs, setBlogs] = useState([])
  const [sortBy, setSortBy] = useState('title')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const addLike = async (blog) => {
    const updatedBlog = {
      author: blog.author,
      user: blog.user.id,
      likes: blog.likes+1,
      title: blog.title,
      url: blog.url
    }
    try{
      await blogService.update(blog.id, updatedBlog)
      const updatedBlogs = blogs.map(oriBlog => {
        if(oriBlog.id===blog.id){
          return { ...blog,likes:blog.likes+1 }
        }else{
          return oriBlog
        }
      })
      setBlogs(updatedBlogs)
    }catch(err){
      setMessage({ type:'error',message:'Error updating blog' })
    }
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)){
      try{
        await blogService.deleteBlog(blog.id)
        const updatedBlogs = blogs.filter(oriBlog => oriBlog.id!==blog.id)
        setMessage({ type:'success',message:'Successfully deleted.' })
        setBlogs(updatedBlogs)
      }catch(err){
        setMessage({ type:'error',message:'Error deleting blog' })
        if(err.message==='Request failed with status code 401'){
          window.localStorage.removeItem('loggedNoteappUser')
          setUser([])
          setMessage({ type:'error',message:'Please log in again.' })
        }
      }
    }
  }

  const addBlogHandler = async (title,author,url) => {
    try {
      const response = await blogService.create({ title,author,url })
      const updatedBlogs = [...blogs,response]
      setBlogs(updatedBlogs)
      setMessage({ type:'success',message:`A new blog "${title}" added successfully` })
      blogFormRef.current.toggleVisibility()
    }catch (err) {
      setMessage({ type:'error',message:'Something went wrong. Please try again.' })
    }
  }

  const bloglist = sortBy === 'likes' ? [...blogs].sort((a,b) => b.likes-a.likes) : [...blogs].sort((a,b) => b.title.toLowerCase()>a.title.toLowerCase()?-1:1)
  /* sort alter the arr in place */

  return (
    <div>
      <h2>Blogs</h2>
      <p className="relative rounded my-2 bg-blue-100 p-1 text-blue-800 inline-block px-4">Hello, {user[0]} <Logout setUser={setUser} setMessage={setMessage} /></p>
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef} >
        <AddBlog setMessage={setMessage} addBlogHandler={addBlogHandler} blogFormRef={blogFormRef} />
      </Togglable>
      <p className="mb-4">Sort by: <span tabIndex="0" className={sortBy==='likes'?'text-blue-900 font-bold':'cursor-pointer text-blue-800 hover:text-blue-400'} onClick={() => {setSortBy('likes')}}>Likes</span> | <span tabIndex="0" className={sortBy==='title'?'text-blue-900 font-bold':'cursor-pointer text-blue-800 hover:text-blue-400'} onClick={() => {setSortBy('title')}}>Title</span>
      </p>
      {bloglist.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} setMessage={setMessage} addLike={addLike} deleteBlog={deleteBlog} />
      )}

    </div>
  )
}

export default Bloglist