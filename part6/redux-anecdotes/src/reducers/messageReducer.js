const messageReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }

}
let timeoutId

export const setNotification = (message, timer) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      message
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => dispatch({
      type: 'CLEAR_MESSAGE'
    }), timer * 1000)
  }
}
export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default messageReducer