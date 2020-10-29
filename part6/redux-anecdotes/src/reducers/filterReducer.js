const filterReducer = (state = '', action) => {
  switch (action.type) {
    case ('CreateFilter'):
      return action.data
    default:
      return state
  }
}

export const createFilter = (filter) => {
  return {
    type: 'CreateFilter',
    data: filter
  }
}

export default filterReducer