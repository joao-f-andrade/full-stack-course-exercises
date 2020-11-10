import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const newBlogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('logged user', loggedUserJSON)
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      newUser.token = blogService.setToken(newUser.token)
      console.log('new user', newUser)
      dispatch(addUser(newUser))
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      dispatch(addUser(user))
      console.log('newUser', user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      user.token = blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
    }
  }

  const logOut = () => {
    dispatch(addUser(null))
    window.localStorage.removeItem('loggedUser')
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
          <BlogList />
          <Togglable buttonLabel='Create new blog' className='newBlogForm' ref={newBlogFormRef}>
            <NewBlogForm
              newBlogFormRef={newBlogFormRef}
              user={user}
            />
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App