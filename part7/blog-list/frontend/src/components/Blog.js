import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  console.log('blog', blog)
  const user = useSelector(state => state.user.current)

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
  if (!blog){return null}

  return (
    <div className='blog' style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
        <div><a href={blog.url}> {blog.url} </a></div>
        <div> likes {blog.likes} <button onClick={like} className='btnLike'>like</button></div>
        <div> {blog.user.name} </div>
        <button onClick={erase} className='btnDelete' >delete</button>  
    </div>
  )
}
export default Blog
