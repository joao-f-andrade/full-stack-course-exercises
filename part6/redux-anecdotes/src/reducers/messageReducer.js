const messageReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return `You created: '${action.data.content}'`
    case 'VOTE_MESSAGE':
      return `You voted:
       '${action.data.content}',
        ${action.data.votes + 1}
        ${action.data.votes + 1 === 1 ? 'vote' : 'votes'}`
    case 'CLEAR_MESSAGE':
      return state === action.data? '' : state
    default:
      return state
  }
}
export const createMessage = () => {
  return {
    type: 'CREATE_MESSAGE'
  }
}
export const votingMessage = (anecdote) => {
  return {
    type: 'VOTE_MESSAGE',
    data: anecdote
  }
}
export const clearMessage = (notification) => {
  return {
    type: 'CLEAR_MESSAGE',
    data: notification
  }
}
export default messageReducer