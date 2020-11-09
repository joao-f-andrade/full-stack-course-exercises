import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('displays title and author but not url or likes by default', () => {
  let component
  beforeEach(() => {
    const example = {
      title: 'exampleTitle',
      author: 'exampleAuthor',
      url: 'exampleUrl',
      likes: 256546456,
      user: {
        name: 'exampleName'
      },
    }
    const mockHandler = jest.fn()
    component = render(
      <Blog blog={example} handleLike={mockHandler} />
    )
  })
  test('displays title', () => {
    expect(component.container).toHaveTextContent('exampleTitle')
  })
  test('doesnt display url or likes', () => {
    const div = component.container.querySelector('.extraInfo')
    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('exampleUrl')
    expect(div).toHaveTextContent('256546456')
  })
  test('displays author', () => {
    expect(component.container).toHaveTextContent('exampleAuthor')
  })
  test('clicking the toglabel button twice calls the function twice', () => {
    const example = {
      title: 'exampleTitle',
      author: 'exampleAuthor',
      url: 'exampleUrl',
      likes: 256546456,
      user: {
        name: 'exampleName'
      },
    }
    const mockHandler = jest.fn()
    component = render(
      <Blog blog={example} handleLike={mockHandler} />
    )
    const likeButton = component.container.querySelector('.btnLike')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
