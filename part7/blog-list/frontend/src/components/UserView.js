import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const allUsers = useSelector(state => state.user.all)
  console.log('id', id, 'alluasers', allUsers)
  console.log(useSelector(state => state.user))
  if (!allUsers) {
    return null
  }
  const user = allUsers.find(user => user.id === id)
  return (
    <>
      <h2>{user.username}</h2>
      <div>added blogs</div>
      <ul>
        { user.blogs.map(blog => (
            <li>{blog.title}</li>
          ))}
      </ul>
    </>
  )
}

export default UserView