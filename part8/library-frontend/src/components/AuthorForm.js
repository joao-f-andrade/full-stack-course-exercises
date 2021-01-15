import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log('author and birthyear', name, birthYear)
    editAuthor({ variables: { name, birthYear } })
    
    console.log('edit author...')

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={birthYear}
            onChange={({ target }) => setBirthYear(parseInt(target.value))}
          />
        </ div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm