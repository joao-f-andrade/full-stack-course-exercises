import React, { useState, useEffect } from 'react'
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
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  const noteFormRef = React.createRef()
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
  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    console.log('token', user.token)
    try {
      const newBlog = await blogService.saveBlog(
        user.token, {
        'author': newAuthor,
        'url': newUrl,
        'title': newTitle
      }
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
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        handleSubmit={handleLogin}
        handlePassChange={({ target }) => setPassword(target.value)}
        handleUsernameChange={({ target }) => setUsername(target.value)}
      />
    </Togglable>
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
            <Blog key={blog.id} blog={blog} />
          )}
          <NewBlogForm
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            submit={handleNewBlog}
          />
        </div>
      }
    </div>
  )
}

export default App