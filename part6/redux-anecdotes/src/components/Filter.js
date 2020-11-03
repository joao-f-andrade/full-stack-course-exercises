import React from 'react'
import { connect } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'


const Filter = (props) => {
  
  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    props.createFilter(content)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name={'filter'} onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  createFilter
}
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter