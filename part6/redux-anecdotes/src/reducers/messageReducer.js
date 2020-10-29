const messageReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NewAnecdote':
      return `You created: '${action.data.content}'`
    case 'VoteMessage':
      return `You voted:
       '${action.data.content}',
        ${action.data.votes + 1}
        ${action.data.votes + 1 === 1 ? 'vote' : 'votes'}`
    case 'ClearMessage':
      return state === action.data? '' : state
    default:
      return state
  }
}
export const createMessage = () => {
  return {
    type: 'CreateMessage'
  }
}
export const votingMessage = (anecdote) => {
  return {
    type: 'VoteMessage',
    data: anecdote
  }
}
export const clearMessage = (notification) => {
  return {
    type: 'ClearMessage',
    data: notification
  }
}
export default messageReducer