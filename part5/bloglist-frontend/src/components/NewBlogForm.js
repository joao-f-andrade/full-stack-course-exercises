import React from 'react'

const NewBlogForm = ({
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  submit
}) => (
    <form onSubmit={submit}>
      <h2>Create new</h2>
      <div>
        title
      <input
          type="text"
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author
      <input
          type="text"
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
      <input
          type="text"
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )

export default NewBlogForm