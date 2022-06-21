import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const { title, author, likes } = blog
  return (
    <div className="blog transition-all relative border mb-2 p-2">
      <span className="block text-xs text-slate-400">👍 {likes}</span>
      <Link
        to={`/blog/${blog.id}`}
        className="text-blue-800 hover:text-orange-800"
      >
        <span className="font-bold">{title}</span>
      </Link>
      <span className="text-xs"> by {author}</span>
    </div>
  )
}
export default Blog
