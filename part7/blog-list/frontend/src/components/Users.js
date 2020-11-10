import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.user.all)
  console.log('users',users)
  const row = (user) => (
    <tr>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )


  return (
    <>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users===null? null:users.map(user => row(user))} 
      </table> 
    </>
  )
}

export default Users