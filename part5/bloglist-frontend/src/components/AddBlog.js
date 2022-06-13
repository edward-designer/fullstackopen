import { useState } from 'react'

const AddBlog = ({ setMessage,addBlogHandler,blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      addBlogHandler(title,author,url)
      setTitle('')
      setAuthor('')
      setUrl('')
    }catch (err) {
      setMessage({ type:'error',message:'Something went wrong. Please try again.' })
    }
  }

  return (
    <div className="border-y my-4 py-4">
      <h3 className="font-bold mb-4 text-blue-700">Add a new blog</h3>
      <form onSubmit={onSubmitHandler} >
        <div className="my-2">
          <label>
            <span className="inline-block w-14">title</span>
            <input
              className="border py-1 px-2 ml-2"
              type="text"
              value={title}
              name="Title"
              id="title"
              required={true}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <span className="inline-block w-14">author</span>
            <input
              className="border py-1 px-2 ml-2"
              type="text"
              value={author}
              name="Author"
              id="author"
              required={true}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div className="my-2">
          <label>
            <span className="inline-block w-14">url</span>
            <input
              className="border py-1 px-2 ml-2"
              type="url"
              value={url}
              name="url"
              id="url"
              required={true}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button className="btn-primary" type="submit" id="addBlog">Add</button>
        <button className="btn-primary ml-2" type="button" onClick={() => blogFormRef.current.toggleVisibility()}>Cancel</button>
      </form>
    </div>
  )

}

export default AddBlog