import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.user.all)
  console.log('users', users)
  const row = (user) => (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )


  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users === null ? null : users.map(user => row(user))}
        </tbody>
      </table>
    </>
  )
}

export default Users