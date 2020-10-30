import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnedocteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anedocte.value
    event.target.anedocte.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anedocte" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnedocteForm