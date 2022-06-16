import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filterText = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdote)

  return (
    <>
      <Filter />
      {[...anecdotes].filter(anecdote=>anecdote.content.toLowerCase().includes(filterText.toLowerCase())).sort((a,b)=>(b.votes-a.votes)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList