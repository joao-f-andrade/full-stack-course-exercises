const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('getting existing blogs', () => {
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
})

describe('posting blogs', () => {
  test('post blogs works', async () => {
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
    const lastBlog = newBlogs[newBlogs.length - 1]
    delete lastBlog.id
    expect(newBlogs)
      .toHaveLength(oldBLogs.length + 1)
    expect(lastBlog).toEqual(newBLog)

  })

  test('blogs without likes property will have it set to 0', async () => {
    const newBLog = {
      'title': 'reddit',
      'author': 'redditors',
      'url': 'https://reddit.com',
    }
    await api
      .post('/api/blogs')
      .send(newBLog)
    const newBlogs = await helper.blogsInDb()
    expect(newBlogs[newBlogs.length - 1].likes).toBe(0)
  })

  test('creating a blog without a title or url returns error 400 bad request', async () => {
    const newBlogNoAuthor = {
      'author': 'redditors',
      'url': 'https://reddit.com',
      'likes': 3
    }
    const newBlogNoUrl = {
      'title': 'reddit',
      'author': 'redditors',
      'likes': 3
    }
    await api
      .post('/api/blogs')
      .send(newBlogNoAuthor)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('blog is deleted by id', async () => {
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const newBLogs = await helper.blogsInDb()
    expect(newBLogs).toHaveLength(blogs.length - 1)

    expect(newBLogs).not.toContain(blogs[0])
  })
})

describe('updating likes of blogs', async () => {
  test('updates the correct number of likes', async () => {
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
    const updatedBlog = {
      id: id,
      likes: blogs[0].likes + 2,
      author: blogs[0].author,
      title: blogs[0].title,
      url: blogs[0].url
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)

    expect(await helper.blogsInDb()).toContainEqual(updatedBlog)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

