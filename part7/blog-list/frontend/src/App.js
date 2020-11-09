import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const newBlogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('logged user', loggedUserJSON)
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      newUser.token = blogService.setToken(newUser.token)
      console.log('new user', newUser)
      setUser(newUser)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      console.log('newUser', user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      user.token = blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setNotification('Wrong credentials',5))
    }
  }
  const handleLike = async (blog) => {
    await blogService.likeBlog(user.token, blog)
    const newBLogs = await blogService.getAll()
    setBlogs(newBLogs)
  }
  const handleDelete = async (blog) => {
    const confirmation = window.confirm(`are you sure you want to permmanently delete ${blog.title}?`)
    if (confirmation === true) {
      try {
        await blogService.deleteBlog(user.token, blog)
        const newBLogs = await blogService.getAll()
        setBlogs(newBLogs)
      } catch (exception) {
        dispatch(setNotification('Operation failed',5))
        console.log(exception)
      }
    }
    else {
      dispatch(setNotification('Operation aborted',5))
    }

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
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} added`, 5))
    } catch (exception) {
      dispatch(setNotification('invalid blog',5))
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
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p> {user.name} <button type='button' onClick={logOut} >Log out</button> </p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} className='btnLogOut' handleDelete={handleDelete} />
          )}
          <Togglable buttonLabel='Create new blog' className='newBlogForm' ref={newBlogFormRef}>
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