const filterReducer = (state = '', action) => {
  switch (action.type) {
    case ('CREATE_FILTER'):
      return action.data
    default:
      return state
  }
}

export const createFilter = (filter) => {
  return {
    type: 'CREATE_FILTER',
    data: filter
  }
}

export default filterReducer