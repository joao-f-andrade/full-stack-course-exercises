import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
const message = useSelector(state => state.notification)
  
  if (message === null) {
    return null
  }

  return (
    <Alert variant='primary' className="error">
      {message}
    </Alert>
  )
}

export default Notification