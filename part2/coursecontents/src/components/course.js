import React from 'react'

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) =>
                <Part key={part.id} part={part}></Part>
            )}
        </div>
    )
}
const Total = ({ course }) => {
    const sum =
        course.parts.reduce((part, p) => part + p.exercises
            , 0)
        ;
    console.log('o resultado é', sum)
    return (
        <p>Number of exercises {sum}</p>
    )
}
const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header id={course.id} course={course}></Header>
            <Content parts={course.parts}></Content>
            <Total course={course}></Total>
        </>
    )
}

export default Course