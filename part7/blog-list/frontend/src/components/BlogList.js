import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogLink = (blog) => (
    <ListGroup.Item><Link style={{'color':'black'}} to={`/blogs/${blog.id}`}>{blog.title}</Link></ ListGroup.Item>
  )

  return (
    <ListGroup variant='flush'>
      {blogs.map(blog => blogLink(blog))}
    </ListGroup>
  )
}
export default BlogList