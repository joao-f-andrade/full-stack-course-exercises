import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  )
}
const CounterButton = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const Statistic = (props) => {
  return (
    <tr>
      <th style={{textAlign:'left'}}>{props.text}</th>
      <td>{props.value}</td>
    </tr>

  )
}
const Statistics = ({ good, neutral, bad }) => {
  if (summ(good, neutral, bad) === 0) {
    return (
      <>
        <Header text='statistics'></Header>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <div>
      <Header text='statistics'></Header>
      <table>
        <tbody>
      <Statistic text='good' value={good}></Statistic>
      <Statistic text='neutral' value={neutral}></Statistic>
      <Statistic text='bad' value={bad}></Statistic>
      <Statistic text='all' value={summ(good, neutral, bad)}></Statistic>
      <Statistic text='average' value={average(good, neutral, bad)}></Statistic>
      <Statistic text='positive' value={percentageOfA(good, neutral, bad) + ' %'}></Statistic>
      </tbody>
      </table>
    </div>
  )
}
function summ(a, b, c) {
  return a + b + c
}
function average(a, b, c) {
  if (a + b + c === 0) {
    return 0
  };
  return ((a - c) / summ(a, b, c))
}
function percentageOfA(a, b, c) {
  if (a + b + c === 0) {
    return 0
  };
  return a * 100 / summ(a, b, c)
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give text'></Header>
      <CounterButton text='good' handleClick={() => { setGood(good + 1) }}></CounterButton>
      <CounterButton text='neutral' handleClick={() => { setNeutral(neutral + 1) }}></CounterButton>
      <CounterButton text='bad' handleClick={() => { setBad(bad + 1) }}></CounterButton>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)