import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3333',
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('@EuVoluntario:token')
      localStorage.removeItem('@EuVoluntario:user')
    }
    return Promise.reject(error)
  }
)

export default api
