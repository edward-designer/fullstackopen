import { useState } from 'react'
import Button from './components/button.component'
import Statistic from './components/statistic.component'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => setGood(good+1);
  const neutralClickHandler = () => setNeutral(neutral+1);
  const badClickHandler = () => setBad(bad+1);

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClickHandler={goodClickHandler} />
        <Button text="neutral" onClickHandler={neutralClickHandler} />
        <Button text="bad" onClickHandler={badClickHandler} />
      </div>
      <h1>statistics</h1>
      <div>
        <Statistic vote={[good,neutral,bad]} />
      </div>
    </>
  )
}

export default App