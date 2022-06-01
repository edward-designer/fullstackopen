import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})

  const onClickHandlerNext = () => {
    const random = Math.floor(Math.random() *anecdotes.length)
    setSelected(random)
  }

  const onClickHandlerVote = () => {
    const newVote = {...points}
    newVote[selected] = newVote[selected]+1||1;
    setPoints(newVote)
  }

  const favorite = () => {
    let favoriteQuote=0;
    let max=0;
    if(Object.keys(points).length>0){
      for (const [index,quoteVote] of Object.entries(points)){
        if(quoteVote>max){
          max=quoteVote;
          favoriteQuote=index;
        }
      }
    }
    return favoriteQuote;
  }

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",flexDirection:"column"}}>
      <div style={{width:"600px"}}>
        <h2>Anecdote of the day</h2>
        <div>
          <q style={{textAlign:"justify",fontSize:"2em",marginBottom:"2em"}}>{anecdotes[selected]}</q>
          <p>has {points[selected]||0} vote</p>
          <button type="button" onClick={onClickHandlerVote}>vote</button>
          <button type="button" onClick={onClickHandlerNext}>next anecdote</button>
        </div>
        <hr />
        <h2>Anecdote with most votes</h2>
        <div>
        { 
          <q style={{textAlign:"justify",fontSize:"2em",marginBottom:"2em"}}>{anecdotes[favorite()]}</q>        
        }
        </div>
      </div>
    </div>
  )
}

export default App