import { useState } from 'react'

import { ReactComponent as LikeIcon } from '../assets/like.svg'
import { ReactComponent as DeleteIcon } from '../assets/delete.svg'

const Blog = ({ addLike, deleteBlog, blog, user }) => {
  const [showDetails, setShowDetails]=useState(false)
  const { likes,author,title,url } = blog

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  if(blog.user.id){
    blog.user = blog.user.id
  }

  if(showDetails){
    return (
      <div className="transition-all relative border mb-2 p-2">
        <div onClick={toggleVisibility} className="w-6 h-6 bg-slate-600 text-white cursor-pointer text-center absolute right-0 top-0 hover:bg-blue-500">X</div>
        <h4 className="font-bold text-xl text-blue-900">{title}</h4>
        <ul>
          <li className="text-sm italic">by {author}</li>
          <li>@ <a href={url} target="_blank" className="text-blue-800 hover:text-blue-400" rel="noreferrer">{url}</a></li>
          <li className="text-slate-500">👍 {likes}</li>
        </ul>
        <LikeIcon data-testid="like-icon" tabIndex="0" alt="like" className="inline-block mt-2 cursor-pointer w-12 h-12 bg-blue-900 p-3 rounded-2xl hover:bg-blue-500" onClick={() => addLike(blog)} />
        {blog.user===user[2]&&<DeleteIcon data-testid="delete-icon" tabIndex="0" alt="delete" className="inline-block mt-2 cursor-pointer w-12 h-12 bg-red-900 p-3 rounded-2xl hover:bg-red-500 ml-2" onClick={() => deleteBlog(blog)} />}
      </div>
    )
  }
  return (
    <div onClick={toggleVisibility} data-testid="toggle-visibility" className="blog transition-all relative border mb-2 p-2 hover:after:content-['Details'] cursor-pointer hover:after:absolute hover:after:text-white hover:after:text-center hover:after:top-0 hover:after:left-0 hover:after:p-2 hover:after:block hover:after:w-full hover:after:h-full hover:after:bg-blue-900/40">
      <span className="block text-xs text-slate-400">👍 {likes}</span>
      <span className="font-bold">{title}</span> <span className="text-xs">by {author}</span>
    </div>
  )

}
export default Blog