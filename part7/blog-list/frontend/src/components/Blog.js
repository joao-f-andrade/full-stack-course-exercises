import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useParams, Redirect } from 'react-router-dom'
import NewCommentForm from './NewCommentForm'
import Button from 'react-bootstrap/Button'
import Togglable from './Togglable'

const Blog = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.current)
  const id = useParams().id
  const newCommentFormRef = useRef()

  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if (!blog) {return <Redirect to='/' />}
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
    <div className='blog' style={blogStyle}>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div><a style={{color:'black'}} href={blog.url}> {blog.url} </a></div>
      <div> likes {blog.likes} <Button size='sm' type='button' onClick={like} className='btnLike'>like</Button></div>
      <div> {blog.user.name} </div>
      <ul>{displayComments(blog.comments)}</ul>
      <Togglable buttonLabel='Create new comment' className='newCommentForm' ref={newCommentFormRef}><NewCommentForm newCommentFormRef={newCommentFormRef} id={blog.id} user={user}/></Togglable>
      <Button variant="outline-danger" onClick={erase} className='btnDelete' >delete blog</Button>
    </div>
  )
}
export default Blog
