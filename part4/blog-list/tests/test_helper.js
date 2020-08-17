const Blog = require('../models/blog')

const initialBlogs = [
  { 'title':'Medium',
    'author':'multiple',
    'url':'https://medium.com/better-programming',
    'likes':0
  },
  { 'title':'tempTitle',
    'author':'testAuthor',
    'url':'testUrl',
    'likes':2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb }
