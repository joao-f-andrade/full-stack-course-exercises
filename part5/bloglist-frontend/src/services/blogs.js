import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const getAll = async () => {
  const request = await axios.get(baseUrl)
  request.data.sort((a,b)=>b.likes-a.likes)
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
  console.log('body.user', body.user)
  body.user = body.user.id
  const request = await axios.put(`${baseUrl}/${body.id}`, body)
  return (request)
}
export default { getAll, setToken, saveBlog, likeBlog }