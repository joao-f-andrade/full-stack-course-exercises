const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength((await helper.blogsInDb()).length)

})

test('blogs have an id', async () => {
  const response = await api
    .get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  }
})

test.only('post blogs works', async () => {
  const newBLog = {
    'title': 'reddit',
    'author': 'redditors',
    'url': 'https://reddit.com',
    'likes': 3
  }
  const oldBLogs = await helper.blogsInDb()
  await api
    .post('/api/blogs')
    .send(newBLog)
  const newBlogs = await helper.blogsInDb()
  const lastBlog = newBlogs[newBlogs.length-1]
  delete lastBlog.id
  expect(newBlogs)
    .toHaveLength(oldBLogs.length + 1)
  expect(lastBlog).toEqual(newBLog)

})

afterAll(() => {
  mongoose.connection.close()
})