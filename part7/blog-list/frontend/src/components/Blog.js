import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useParams, Redirect } from 'react-router-dom'
import NewCommentForm from './NewCommentForm'
import Button from 'react-bootstrap/Button'
import Togglable from './Togglable'
import ListGroup from 'react-bootstrap/ListGroup'

const Blog = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.current)
  const id = useParams().id
  const newCommentFormRef = useRef()

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if (!blog) { return <Redirect to='/' /> }
  console.log('blog', blog)

  const handleLike = async (blog) => {
    await blogService.likeBlog(user.token, blog)
    const newBLogs = await blogService.getAll()
    dispatch(addBlog(newBLogs))
  }
  const handleDelete = async (blog) => {
    const confirmation = window.confirm(`are you sure you want to permmanently delete ${blog.title}?`)
    if (confirmation === true) {
      try {
        await blogService.deleteBlog(user.token, blog)
        const newBLogs = await blogService.getAll()
        dispatch(addBlog(newBLogs))
      } catch (exception) {
        dispatch(setNotification('Operation failed', 5))
        console.log(exception)
      }
    }
    else {
      dispatch(setNotification('Operation aborted', 5))
    }

  }

  const like = (event) => {
    event.preventDefault()
    handleLike(blog)
  }
  const erase = (event) => {
    event.preventDefault()
    handleDelete(blog)
  }
  if (!blog) { return null }

  const displayComments = (comments) => {
    const returnComments = (comment) => (
      <li>{comment}</li>
    )
    return comments.map(comment => returnComments(comment))
  }
  return (
    <div className='blog'>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <ListGroup variant="flush">
        <ListGroup.Item><a style={{ color: 'black' }} href={blog.url}> {blog.url} </a></ListGroup.Item>
        <ListGroup.Item> likes {blog.likes} <Button size='sm' type='button' onClick={like} className='btnLike'>like</Button></ListGroup.Item>
        <ListGroup.Item> {blog.user.name} </ListGroup.Item>
        <ListGroup.Item><ul>{displayComments(blog.comments)}</ul></ListGroup.Item>
        <Togglable
          buttonLabel='Create new comment'
          className='newCommentForm'
          ref={newCommentFormRef}>
          <NewCommentForm newCommentFormRef={newCommentFormRef} id={blog.id} user={user} />
        </Togglable>
        <Button variant="outline-danger" onClick={erase} className='btnDelete' >delete blog</Button>
      </ListGroup>
    </div>
  )
}
export default Blog
