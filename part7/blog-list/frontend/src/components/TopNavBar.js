import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentUser } from '../reducers/userReducer'



const TopNavBar = () => {
  const user = useSelector(state => state.user.current)
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(addCurrentUser(null))
    window.localStorage.removeItem('loggedUser')
  }
  return (
    <div>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      <span> {`${user.name} is logged in`} <button type='button' onClick={logOut}>Log out</button> </span>
    </div>
  )
}
export default TopNavBar