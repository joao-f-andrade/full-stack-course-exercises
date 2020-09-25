import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const newBlogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      user.token = blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLike = async (blog) => {
    await blogService.likeBlog(user.token, blog)
    const newBLogs = await blogService.getAll()
    setBlogs(newBLogs)
  }
  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }
  const createNewBlog = async (blogObject) => {
    newBlogFormRef.current.toggleVisibility()
    console.log('token', user.token)
    try {
      const newBlog = await blogService.saveBlog(
        user.token, blogObject
      )
      console.log('saved blog', newBlog)
      setSuccessMessage(`${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('invalid blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(exception)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }
  const loginForm = () => (
      <LoginForm
        handleSubmit={handleLogin}
        handlePassChange={({ target }) => setPassword(target.value)}
        handleUsernameChange={({ target }) => setUsername(target.value)}
      />
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification message={successMessage} />
          <p> {user.name} <button type='button' onClick={logOut} >Log out</button>
          </p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} />
          )}
          <Togglable buttonLabel='Create new blog' ref={newBlogFormRef}>
            <NewBlogForm
              createNewBlog={createNewBlog}
            />
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App