import axios from 'axios'
const baseUrl = '/api/login'

const logIn = async (username, password) => {
  const request = await axios.post(baseUrl, { username, password })
  return request.data
}

const logOut = async (username, password) => {
  await axios.post(baseUrl, { username, password })
}

export default { logIn, logOut }