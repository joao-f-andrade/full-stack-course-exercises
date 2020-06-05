import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  const Content = (props) => {
    return (
      <div>
        <Part part={props.part[0]}/>
        <Part part={props.part[1]}  />
        <Part part={props.part[2]}  />
      </div>
    )
  }
  const Part = (props) => {
    return (
      <div>
        <p>{props.part.name} {props.part.exercises}</p>
      </div>
    )
  }
  const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))