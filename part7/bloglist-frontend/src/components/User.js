import { useSelector } from 'react-redux'
import { useParams, Link, Navigate } from 'react-router-dom'

const User = () => {
  const userId = useParams()
  const user = useSelector((state) =>
    state.users?.filter((user) => user.id === userId.id)
  )
  if (!user) {
    return <Navigate to="/users" replace={true} />
  }
  return (
    <>
      <h2>
        Blogs added by <strong>{user[0].name}</strong>
      </h2>
      <ul className="list-disc pl-4 mt-4">
        {user[0].blogs.length > 0 ? (
          user[0].blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-700 hover:text-orange-700"
              >
                {blog.title}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-slate-500 italic">No blogs yet</li>
        )}
      </ul>
    </>
  )
}

export default User
