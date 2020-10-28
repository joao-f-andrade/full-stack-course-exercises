const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'Vote':
      const id = action.data
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return newState.sort((a, b) => { return b.votes - a.votes })
    case 'NewAnecdote':
      return [...state, action.data]
    default:
      return state.sort((a, b) => { return b.votes - a.votes })

  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NewAnecdote',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export const vote = (id) => {
  return {
    type: 'Vote',
    data: id
  }
}

export default anecdoteReducer