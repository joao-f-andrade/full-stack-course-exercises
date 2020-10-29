import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearMessage } from '../reducers/messageReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  notification === '' ? (
    style.display = 'none'
  ) : (
      setTimeout(() => dispatch(clearMessage(notification)), 5000)
    )
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification