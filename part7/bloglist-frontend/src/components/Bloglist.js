import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import AddBlog from './AddBlog'
import Togglable from './Togglable'

import { setNotification } from '../reducers/notificationSlice'
import {
  getBlogsFromServer,
  addOneBlog,
  plusOneLike,
  deleteOneBlog,
} from '../reducers/bloglistSlice'

const Bloglist = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.bloglist)
  const [sortBy, setSortBy] = useState('title')

  const blogFormRef = useRef()
  console.log(blogs)
  useEffect(() => {
    dispatch(getBlogsFromServer())
  }, [])

  const addLike = async (blog) => {
    try {
      dispatch(plusOneLike(blog))
      dispatch(
        setNotification({
          type: 'success',
          message: 'Your vote has been added',
        })
      )
    } catch (err) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Error updating blog' + err.message,
        })
      )
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteOneBlog(blog))
        dispatch(
          setNotification({ type: 'success', message: 'Successfully deleted.' })
        )
      } catch (err) {
        setNotification({ type: 'error', message: 'Error deleting blog' })
        if (err.message === 'Request failed with status code 401') {
          window.localStorage.removeItem('loggedNoteappUser')
          setUser([])
          dispatch(
            setNotification({ type: 'error', message: 'Please log in again.' })
          )
        }
      }
    }
  }

  const addBlogHandler = async (title, author, url) => {
    try {
      dispatch(addOneBlog({ title, author, url }))
      dispatch(
        setNotification({
          type: 'success',
          message: `A new blog "${title}" added successfully`,
        })
      )
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Something went wrong. Please try again.',
        })
      )
    }
  }

  const bloglist =
    sortBy === 'likes'
      ? [...blogs].sort((a, b) => b.likes - a.likes)
      : [...blogs].sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1)
  /* sort alter the arr in place */

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <AddBlog addBlogHandler={addBlogHandler} blogFormRef={blogFormRef} />
      </Togglable>
      <p className="mb-4">
        Sort by:{' '}
        <span
          tabIndex="0"
          className={
            sortBy === 'likes'
              ? 'text-blue-900 font-bold'
              : 'cursor-pointer text-blue-800 hover:text-blue-400'
          }
          onClick={() => {
            setSortBy('likes')
          }}
        >
          Likes
        </span>{' '}
        |{' '}
        <span
          tabIndex="0"
          className={
            sortBy === 'title'
              ? 'text-blue-900 font-bold'
              : 'cursor-pointer text-blue-800 hover:text-blue-400'
          }
          onClick={() => {
            setSortBy('title')
          }}
        >
          Title
        </span>
      </p>
      {bloglist.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          setMessage={setNotification}
          addLike={addLike}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default Bloglist
