import React, { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
          id='titleInput'
          type="text"
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          id='authorInput'
          type="text"
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          id='urlInput'
          type="text"
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}
export default NewBlogForm