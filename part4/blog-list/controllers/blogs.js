const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = await new Blog(request.body)
  blog.user = await Blog.findById('5f4942ce33a0982f2b49abdb').id
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog
    .findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedBlog).status(200)
})


module.exports = blogsRouter