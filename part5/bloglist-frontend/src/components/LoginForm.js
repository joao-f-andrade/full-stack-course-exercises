import React from 'react'
const LoginForm = (props) => (

  <form onSubmit={props.submit}>
    <h2>Log In</h2>
    <div>
      username
      <input
        type="text"
        name="Username"
        onChange={({ target }) => props.handleUsernameChange(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        name="Password"
          onChange={({ target }) => props.handlePassChange(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm