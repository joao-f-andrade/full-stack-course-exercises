import React, { useState } from 'react'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addCurrentUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import Notification from './Notification'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      dispatch(addCurrentUser(user))
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
  const handlePassChange = ({ target }) => setPassword(target.value)
  const handleUsernameChange = ({ target }) => setUsername(target.value)

  return (
    <div>
      <h2>Log In</h2>
      <Notification />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>  username</Form.Label>
          <Form.Control
            id='username'
            type="text"
            name="Username"
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type="password"
            name="Password"
            onChange={handlePassChange}
          />
        </Form.Group>
        <Button type="submit" id='login-button'>login</Button>
      </Form>
    </div>
  )
}

export default LoginForm