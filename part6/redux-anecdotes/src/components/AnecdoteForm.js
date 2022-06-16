import { useState } from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const [newAnecdote, setNewAnecdote] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault()
        if(newAnecdote){
            props.createAnecdote(newAnecdote)
            setNewAnecdote('')
        }
        return
    }

    return (
      <>
        <h2>create new</h2>
        <form onSubmit={submitHandler}>
            <label>New Anecdote: <input required={true} onChange={(e)=>setNewAnecdote(e.target.value)} name="newAnecdote" value={newAnecdote} /></label>
            <button>create</button>
        </form>
      </>
    )  
}

const ConnectedAnecdoteForm = connect(
  null, { createAnecdote }
)(AnecdoteForm)

export default ConnectedAnecdoteForm