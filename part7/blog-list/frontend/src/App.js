import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import {
  Switch,
  Route,
} from "react-router-dom"

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
  const mainPage = () => (
    <div>
      <BlogList />
      <Togglable buttonLabel='Create new blog' className='newBlogForm' ref={newBlogFormRef}>
        <NewBlogForm
          newBlogFormRef={newBlogFormRef}
          user={user}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <div>
            <p> {`${user.name} is logged in`}  </p>
            <button type='button' onClick={logOut} >Log out</button>
          </div>
          <Switch>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              {mainPage()}
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App