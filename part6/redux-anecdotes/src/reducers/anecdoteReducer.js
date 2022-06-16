import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

import { setNotification } from '../reducers/notificationReducer'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

/*const initialState = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
].map(asObject)*/

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    voteAdd (state, action) {
      const id = action.payload
      state.map(anecdote=>{ if(anecdote.id === id){ anecdote.votes+=1 } return anecdote})
    },
    addNew (state, action) {
      const anecdote = action.payload
      return [...state,anecdote]
    },
    addAll (state, action) {
      return action.payload
    }    
  }
})

export const { voteAdd, addNew, addAll } = anecdoteSlice.actions

export const initialAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(addAll(anecdotes))
  }
}

export const createAnecdote = newAnecdote => {
  return async dispatch => {
    const newObject = await anecdoteService.addNew(newAnecdote)
    dispatch(setNotification('The anecdote has been added successfully',5))
    dispatch(addNew(newObject))
  }
}

export const vote = anecdoteObj => {
  return async dispatch => {
    await anecdoteService.addVote(anecdoteObj)
    dispatch(setNotification('Your vote has been added successfully',5))
    dispatch(voteAdd(anecdoteObj.id))
  }
}

export default anecdoteSlice.reducer
