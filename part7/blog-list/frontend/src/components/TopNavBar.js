import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentUser } from '../reducers/userReducer'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'




const TopNavBar = () => {
  const user = useSelector(state => state.user.current)
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(addCurrentUser(null))
    window.localStorage.removeItem('loggedUser')
  }
  return (
    <Navbar bg="dark" expand='xl' variant="dark">
      <Navbar.Brand><Link style={{ color: 'white' }} to='/'>BlogsApp</Link></Navbar.Brand>
      <Nav.Link><Link style={{ color: 'white' }} to='/blogs'>blogs</Link></Nav.Link>
      <Nav.Link><Link style={{ color: 'white' }} to='/users'>users</Link></Nav.Link>
      <Container style={{flexDirection:'row-reverse'}}>
        <Navbar.Text style={{position:'relative',right:'0'}}>
          {`${user.name} is logged in`} <Button variant='primary' size='sm' type='button' onClick={logOut}>Log out</Button>
        </Navbar.Text></Container>
    </Navbar>
  )
}
export default TopNavBar