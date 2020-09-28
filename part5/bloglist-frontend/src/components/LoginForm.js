import React from 'react'
const LoginForm = ({
  handleUsernameChange,
  handlePassChange,
  handleSubmit
}) => (

  <form onSubmit={handleSubmit}>
    <h2>Log In</h2>
    <div>
      username
      <input
        type="text"
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        name="Password"
        onChange={handlePassChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm