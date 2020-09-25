import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  return token = `bearer ${newToken}`
}
const saveBlog = async (token,body) => {
  console.log('token e body',token,body)
  const config = {
        headers: { Authorization: token },
        }
  const request = await axios.post(baseUrl,
    body,
  config
  )
  return(request.data)
}
const likeBlog = async (token,body) => {
  console.log('token e body', token, body)
  body.likes += 1
  delete body.user
  const request = await axios.put(`${baseUrl}/${body.id}`,body)
  return(request)
}
export default { getAll, setToken, saveBlog, likeBlog }