import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('NewBlogForm receives inputs and passes them correctly', () => {
  const createNewBlog = jest.fn()
  const example = {
    title: 'titleExample',
    author: 'authorExample',
    url: 'urlExample',
  }
  let component = render(
    <NewBlogForm createNewBlog={createNewBlog} />
  )
  const author = component.container.querySelector('#authorInput')
  const url = component.container.querySelector('#urlInput')
  const title = component.container.querySelector('#titleInput')
  const submit = component.getByText('submit')
  fireEvent.change(author, {
    target: { value: 'authorExample' }
  })
  fireEvent.change(url, {
    target: { value: 'urlExample' }
  })
  fireEvent.change(title, {
    target: { value: 'titleExample' }
  })
  fireEvent.submit(submit)
  expect(createNewBlog.mock.calls[0][0]).toEqual(example)
})