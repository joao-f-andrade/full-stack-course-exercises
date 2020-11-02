import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnedocteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anedocte.value
    event.target.anedocte.value = ''
    await dispatch(createAnecdote(content))
    dispatch(setNotification(`You created: '${content}'`,5))
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