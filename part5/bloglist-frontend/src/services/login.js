import axios from 'axios'
const baseUrl = '/api/login'

const logIn = async (username, password) => {
    const request = await axios.post(baseUrl, {username, password})
    return request.data.token
}

const logOut = async (username, password) => {
    const request = await axios.post(baseUrl, {username, password})
    return request.data.token
}

export default {logIn, logOut}