import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const addNew = async ( content ) => {
    const object = { content, votes:0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVote = async ( anecdote ) => {
  const {content, votes, id } = anecdote
  const response = await axios.put(baseUrl+'/'+id,{content,votes:votes+1})
  return response.data
}

export default { getAll, addNew, addVote }