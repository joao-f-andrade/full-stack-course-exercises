import React from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('content')
  const info = useField('info')
  const author = useField('author')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetAll = () => {
    content.clearState()
    info.clearState()
    author.clearState()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type='button' onClick={resetAll}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew