const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    return decoded
  })
  const user = await User.findById(decodedToken.id)

  const blog = await new Blog(request.body)
  blog.user = user.id
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    return decoded
  })
  const user = await User.findById(decodedToken.id)
  const author = await Blog.findById(request.params.id)
  if (JSON.stringify(user._id) === JSON.stringify(author.user) && author !== undefined) {
    await Blog
      .findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  return response.status(400).json({ error: 'only the author can delete the blog' })
})

blogsRouter.put('/:id', async (request, response) => {
  const token = request.token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    return decoded
  })
  const newBlog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedBlog).status(200)
})


module.exports = blogsRouter