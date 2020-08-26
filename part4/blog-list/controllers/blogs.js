const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => response.status(400).json(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog
    .findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', (request, response) => {
  const newBlog = request.body
  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
      response.status(200)
    })
})


module.exports = blogsRouter