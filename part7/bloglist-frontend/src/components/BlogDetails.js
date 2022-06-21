import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as LikeIcon } from '../assets/like.svg'
import { ReactComponent as DeleteIcon } from '../assets/delete.svg'

import {
  plusOneLike,
  deleteOneBlog,
  addOneComment,
} from '../reducers/bloglistSlice'

const BlogDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogId = useParams()
  const blog = useSelector((state) =>
    state.bloglist.filter((blog) => blog.id === blogId.id)
  )

  const commentHandler = (e) => {
    const keyCode = e.code || e.key
    if (keyCode === 'Enter') {
      const comments = e.target.value
      e.target.value = ''
      dispatch(addOneComment(blogId.id, comments))
    }
  }

  const user = useSelector((state) => state.user)

  if (blog.length === 0) {
    return <Navigate to="/" replace={true} />
  }
  const { title, author, url, likes, comments } = blog[0]

  return (
    <>
      <div className="transition-all relative border mb-2 p-2">
        <h4 className="font-bold text-xl text-blue-900">{title}</h4>
        <ul>
          <li className="text-sm italic">by {author}</li>
          <li>
            @{' '}
            <a
              href={url}
              target="_blank"
              className="text-blue-800 hover:text-blue-400"
              rel="noreferrer"
            >
              {url}
            </a>
          </li>
          <li className="text-slate-500">👍 {likes}</li>
        </ul>
        <h4 className="text-mt font-bold mt-4">Comments</h4>
        <ul className="list-disc ml-4">
          {comments.length === 0 ? (
            <li className="text-slate-500 italic">No comments yet</li>
          ) : (
            comments.map((comment, idx) => <li key={idx}>{comment}</li>)
          )}
        </ul>
        <div className="flex">
          <LikeIcon
            data-testid="like-icon"
            tabIndex="0"
            alt="like"
            className="inline-block mt-2 cursor-pointer w-12 h-12 bg-blue-900 p-3 rounded-2xl hover:bg-blue-500"
            onClick={() => dispatch(plusOneLike(blog[0]))}
          />
          {blog.user?.id === user?.id && (
            <DeleteIcon
              data-testid="delete-icon"
              tabIndex="0"
              alt="delete"
              className="inline-block mt-2 cursor-pointer w-12 h-12 bg-red-900 p-3 rounded-2xl hover:bg-red-500 ml-2"
              onClick={() => dispatch(deleteOneBlog(blog[0]))}
            />
          )}
          <input
            type="text"
            placeholder="Add Comments (enter to add)"
            className="ml-4 border p-2 flex-1"
            onKeyDown={commentHandler}
          />
        </div>
      </div>
      <span
        className="text-xs text-blue-800 hover:text-orange-800 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go back
      </span>
    </>
  )
}
export default BlogDetails
