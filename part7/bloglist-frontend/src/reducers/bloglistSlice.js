import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const bloglistSlice = createSlice({
  name: 'bloglist',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return [...state, action.payload]
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    addLike(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, likes: blog.likes + 1 }
        } else {
          return blog
        }
      })
    },
    addComment(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return {
            ...blog,
            comments: [...blog.comments, action.payload.comments],
          }
        } else {
          return blog
        }
      })
    },
  },
})

export const { setBlogs, addBlog, deleteBlog, addLike, addComment } =
  bloglistSlice.actions

export const getBlogsFromServer = () => {
  return async (dispatch) => {
    const blogsOnServer = await blogService.getAll()
    return dispatch(setBlogs(blogsOnServer))
  }
}

export const addOneBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url })
    return dispatch(addBlog(newBlog))
  }
}

export const plusOneLike = (blog) => {
  const updatedBlog = {
    author: blog.author,
    user: blog.user.id,
    likes: blog.likes + 1,
    title: blog.title,
    url: blog.url,
    id: blog.id,
  }
  return async (dispatch) => {
    await blogService.update(blog.id, updatedBlog)
    return dispatch(addLike(updatedBlog))
  }
}

export const deleteOneBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id)
    return dispatch(deleteBlog(blog))
  }
}

export const addOneComment = (id, comments) => {
  const newComment = {
    comments,
    id,
  }
  return async (dispatch) => {
    await blogService.addComment(newComment)
    return dispatch(addComment(newComment))
  }
}

export default bloglistSlice.reducer
