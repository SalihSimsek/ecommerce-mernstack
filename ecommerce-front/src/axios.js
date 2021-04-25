const axios = require('axios')

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: { 'Authorization': localStorage.getItem('token') || '' }
})

export default instance;