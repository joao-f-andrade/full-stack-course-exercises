import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.current)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const like = (event) => {
    event.preventDefault()
    handleLike(blog)
  }
  const erase = (event) => {
    event.preventDefault()
    handleDelete(blog)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='mainInfo'>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility} className='btnView'>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible} className='extraInfo'>
        <div> {blog.url} </div>
        <div> likes {blog.likes} <button onClick={like} className='btnLike'>like</button></div>
        <div> {blog.user.name} </div>
        <button onClick={erase} className='btnDelete' >delete</button>
      </div>
    </div>
  )
}
export default Blog
