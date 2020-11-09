const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'ADD_BLOG':
      return action.blogs
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    blogs
  }
}

export const addBlog = (blogs) => {
  return {
    type: 'ADD_BLOG',
    blogs
  }
}


export default blogReducer