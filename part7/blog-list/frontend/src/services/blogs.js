import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
console.log(token)
const getAll = async () => {
  const request = await axios.get(baseUrl)
  request.data.sort((a,b) => b.likes-a.likes)
  console.log('getBlogs', request.data)
  return request.data
}

const setToken = newToken => {
  return token = `bearer ${newToken}`
}
const saveBlog = async (token, body) => {
  console.log('token e body', token, body)
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl,
    body,
    config
  )
  return (request.data)
}
const likeBlog = async (token, body) => {
  console.log('token e body', token, body)
  body.likes += 1
  body.user = body.user.id
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(`${baseUrl}/${body.id}`, body, config)
  return (request)
}
const deleteBlog = async (token, body) => {
  console.log('token and body', token, body)
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${body.id}`,config)
}
const addComment = async (token, body) => {
  console.log('token and body', token, body)
  const config = {
    headers: { Authorization: token },
  }
  const comment = {comment: body.comment}
  const response = await axios.post(
    `${baseUrl}/${body.id}/comments`,
    comment,
    config
    )
  return response
}
export default { getAll, setToken, saveBlog, likeBlog, deleteBlog, addComment }