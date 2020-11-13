import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const NewBlogForm = ({ newBlogFormRef, user }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const createNewBlog = async (blogObject) => {
    newBlogFormRef.current.toggleVisibility()
    console.log('token', user.token)
    try {
      const newBlog = await blogService.saveBlog(
        user.token, blogObject
      )
      console.log('saved blog', newBlog)
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} added`, 5))
    } catch (exception) {
      dispatch(setNotification('invalid blog', 5))
      console.log(exception)
    }
    blogService.getAll().then(blogs =>
      dispatch(addBlog(blogs))
    )
  }

  const handleTitleChange = ({ target }) => setNewTitle(target.value)
  const handleAuthorChange = ({ target }) => setNewAuthor(target.value)
  const handleUrlChange = ({ target }) => setNewUrl(target.value)

  const submit = (event) => {
    event.preventDefault()
    createNewBlog({
      'author': newAuthor,
      'url': newUrl,
      'title': newTitle
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <Form onSubmit={submit}>
        <Form.Group>
        <Form.Label>Title</Form.Label>  
        <Form.Control
            className='titleInput'
            type="text"
            name="title"
            onChange={handleTitleChange}
            value={newTitle}
          />
        </Form.Group>
        <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control
            className='authorInput'
            type="text"
            name="author"
            onChange={handleAuthorChange}
            value={newAuthor}
          />
        </Form.Group>
        <Form.Group>
        <Form.Label>Url</Form.Label>
        <Form.Control
            className='urlInput'
            type="text"
            name="url"
            onChange={handleUrlChange}
            value={newUrl}
          />
        </Form.Group>
        <Button className='submit' type="submit">submit</Button>
      </Form>
    </div>
  )
}
export default NewBlogForm