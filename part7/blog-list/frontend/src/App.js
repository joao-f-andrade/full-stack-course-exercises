import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import UserView from './components/UserView'
import blogService from './services/blogs'
import usersService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { addCurrentUser, addAllUsers } from './reducers/userReducer'
import { Switch, Route, Link } from "react-router-dom"

const App = () => {
  const user = useSelector(state => state.user.current)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const newBlogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
    usersService.getAll().then(users =>
      dispatch(addAllUsers(users))
    )
  }, [dispatch])
  useEffect(() => {
    usersService.getAll().then(users =>
      dispatch(addAllUsers(users))
    )
  }, [dispatch,blogs])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('logged user', loggedUserJSON)
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      newUser.token = blogService.setToken(newUser.token)
      console.log('new user', newUser)
      dispatch(addCurrentUser(newUser))
    }
  }, [dispatch])

  const logOut = () => {
    dispatch(addCurrentUser(null))
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
      {user === null ?
        <LoginForm /> :
        <div>
          <header>
            <Link to='/'>blogs</Link>
            <Link to='/users'>users</Link>
            <span> {`${user.name} is logged in`} <button type='button' onClick={logOut}>Log out</button> </span>
            <h1>Blogs</h1>
          </header>

          <Notification />

          <Switch>
            <Route path='/users/:id' >
              <UserView />
            </Route>
            <Route path='/users'>
              <UsersList />
            </Route>
            <Route path='/blogs/:id'>
              <Blog />
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