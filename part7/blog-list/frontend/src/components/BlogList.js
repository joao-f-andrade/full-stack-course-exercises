import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogLink = (blog) => (
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )

  return (
    <div>
      {blogs.map(blog => blogLink(blog))}
    </div>
  )
}
export default BlogList