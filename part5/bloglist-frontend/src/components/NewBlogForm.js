import React from 'react'

const NewBlogForm = (props) => (
<form  onSubmit={props.submit}>
    <h2>Create new</h2>
    <div>
      title
      <input
        type="text"
        name="title"
        onChange={({ target }) => props.handleTitleChange(target.value)}
      />
    </div>
    <div>
      author
      <input
        type="text"
        name="author"
          onChange={({ target }) => props.handleAuthorChange(target.value)}
      />
    </div>
    <div>
      url
      <input
        type="text"
        name="url"
        onChange={({ target }) => props.handleUrlChange(target.value)}
      />
    </div>
    <button type="submit">submit</button>
  </form>
)

export default NewBlogForm