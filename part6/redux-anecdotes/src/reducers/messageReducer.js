const messageReducer = (state = {id:'',message:''}, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_MESSAGE':
      return action.data.id === state.id
        ? {message:'',id:''}
        : state
    default:
      return state
  }

}
let nextNotificationId = 0

export const setNotification = (message, timer) => {
  return async dispatch => {
    const id = nextNotificationId++
    await dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        id: id
      }
    })
    setTimeout(() => dispatch({
      type: 'CLEAR_MESSAGE',
      data: {
        message: message,
        id: id
      }
    }), timer * 1000)
  }
}
export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default messageReducer