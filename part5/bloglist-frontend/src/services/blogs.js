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
  console.log(request)
}
export default { getAll, setToken, saveBlog }