const userReducer = (state = {current:null, all:null}, action) => {
  let newState
  switch (action.type) {
    case 'ADD_CURRENT_USER':
      newState = {...state,'current':action.user}
      return newState
    case 'ADD_ALL_USERS':
      newState = {...state, 'all':action.users}
      return newState
    default:
      return state
  }
}
export const addCurrentUser = (user) => {
  return {
    type: 'ADD_CURRENT_USER',
    user
  }
}

export const addAllUsers = (users) => {
  return {
      type: 'ADD_ALL_USERS',
      users
    }
  }



export default userReducer