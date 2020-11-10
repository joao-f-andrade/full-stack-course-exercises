import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'


const NewBlogForm = ({  newBlogFormRef, user }) => {
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
      dispatch(setNotification('invalid blog',5))
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
    <form onSubmit={submit}>
      <h2>Create new blog</h2>
      <div>
        title
        <input
          className='titleInput'
          type="text"
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          className='authorInput'
          type="text"
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          className='urlInput'
          type="text"
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button className='submit' type="submit">submit</button>
    </form>
  )
}
export default NewBlogForm