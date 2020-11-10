import { useReducer } from "react";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.user
    default:
      return state
  }
}
export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    user
  }
}

export default userReducer