import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const store = useSelector(state=>state)

    const clickHandler = (type) => {
      switch (type) {
        case 'good':
          dispatch({
            type: 'GOOD'
          })
          break
        case 'ok':
          dispatch({
            type: 'OK'
          })
          break
        case 'bad':
           dispatch({
              type: 'BAD'
          })
          break  
        case 'zero':
          dispatch({
              type: 'ZERO'
          })
          break   
        default:
          return 
      }
  
    }
  
    return (
      <div>
        <button onClick={()=>clickHandler('good')}>good</button>
        <button onClick={()=>clickHandler('ok')}>ok</button>
        <button onClick={()=>clickHandler('bad')}>bad</button>
        <button onClick={()=>clickHandler('zero')}>reset stats</button>
        <div>good {store.good}</div>
        <div>ok {store.ok}</div>
        <div>bad {store.bad}</div>
      </div>
    )
  }

export default App