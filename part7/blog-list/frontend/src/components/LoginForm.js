import React, {useState} from 'react'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/userReducer'
import blogService from '../services/blogs'

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
  const handlePassChange=({ target }) => setPassword(target.value)
  const handleUsernameChange=({ target }) => setUsername(target.value)

return (
  <form onSubmit={handleSubmit}>
    <h2>Log In</h2>
    <div>
      username
      <input
        id='username'
        type="text"
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        id='password'
        type="password"
        name="Password"
        onChange={handlePassChange}
      />
    </div>
    <button type="submit" id='login-button'>login</button>
  </form>
)}

export default LoginForm