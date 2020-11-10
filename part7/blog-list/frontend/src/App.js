import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const newBlogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('logged user', loggedUserJSON)
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      newUser.token = blogService.setToken(newUser.token)
      console.log('new user', newUser)
      dispatch(addUser(newUser))
    }
  }, [dispatch])

  const logOut = () => {
    dispatch(addUser(null))
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm /> :
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