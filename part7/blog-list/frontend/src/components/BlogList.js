import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleDelete, handleLike }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default BlogList