import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const NewCommentForm = ({ id, user }) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()

  const createNewComment = async (comment,id) => {
    try {
      const body = {comment,id}
      const newBlog = await blogService.addComment(
        user.token, body
      )
      console.log('saved comment', newBlog)
      dispatch(setNotification(`${comment} added`, 5))
    } catch (exception) {
      dispatch(setNotification('invalid comment', 5))
      console.log(exception)
    }
    blogService.getAll().then(blogs =>
      dispatch(addBlog(blogs))
    )
  }
  const handleChange = ({ target }) => setNewComment(target.value)

  const submit = (event) => {
    event.preventDefault()
    console.log(event)
    createNewComment(newComment,id)
    setNewComment('')
  }

  return (
    <form onSubmit={submit}>
      <input
        className='commentInput'
        type="text"
        name="comment"
        onChange={handleChange}
        value={newComment}
      />
      <button className='submit' type="submit">add comment</button>

    </form>

  )
}

export default NewCommentForm