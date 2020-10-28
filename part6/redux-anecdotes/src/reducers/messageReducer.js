const messageReducer = (state = 'initial message', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NewMessage':
      return action.data
    case 'Clear':
      return ''
    default:
      return state
  }
}

export default messageReducer