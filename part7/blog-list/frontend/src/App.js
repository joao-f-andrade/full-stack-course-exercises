import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UsersList from './components/UsersList'
import UserView from './components/UserView'
import blogService from './services/blogs'
import usersService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { addCurrentUser, addAllUsers } from './reducers/userReducer'
import { Switch, Route, Link } from "react-router-dom"
import MainPage from './components/MainPage'

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

  return (
    <div className='container'>
      {user === null ?
        <LoginForm /> :
        <div>
          <header>
            <Link to='/'>blogs</Link>
            <Link to='/users'>users</Link>
            <span> {`${user.name} is logged in`} <button type='button' onClick={logOut}>Log out</button> </span>
            <h1>BlogsApp</h1>
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
              <MainPage newBlogFormRef={newBlogFormRef}></MainPage>
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App