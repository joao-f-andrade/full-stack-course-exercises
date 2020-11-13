import React, { useRef } from 'react'
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import NewBlogForm from '../components/NewBlogForm'
import { useSelector } from 'react-redux'

const MainPage = () => {
  const user = useSelector(state => state.user.current)
  const newBlogFormRef = useRef()

  return (
    <div>
      <h2>Blogs</h2>
      <BlogList />
      <Togglable buttonLabel='Create new blog' className='newBlogForm' ref={newBlogFormRef}>
        <NewBlogForm
          newBlogFormRef={newBlogFormRef}
          user={user}
        />
      </Togglable>
    </div>
  )
}

export default MainPage