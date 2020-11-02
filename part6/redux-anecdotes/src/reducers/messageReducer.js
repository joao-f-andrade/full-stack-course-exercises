const messageReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }

}
export const setNotification = (message, timer) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
    setTimeout(() => dispatch({
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