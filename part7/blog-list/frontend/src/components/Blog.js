import React, { useState } from 'react'
const Blog = ({
  blog,
  handleLike,
  handleDelete
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
