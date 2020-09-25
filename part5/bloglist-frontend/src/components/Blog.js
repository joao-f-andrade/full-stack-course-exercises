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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div> {blog.url} </div>
        <div> likes {blog.likes} <button onClick={like}>like</button></div>
        <div> {blog.user.name} </div>
        <button onClick={erase}>delete</button>
      </div>
    </div>
  )
}
export default Blog
