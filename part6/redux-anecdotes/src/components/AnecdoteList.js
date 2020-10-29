import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { votingMessage } from '../reducers/messageReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote.id))
              dispatch(votingMessage(anecdotes.find(n => n.id === anecdote.id)))
              }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList