import axios from 'axios'
import GLOBAL from '../global'
import logService from './LogService'

const { REACT_APP_BASE_VA_API_URL } = process.env

const axiosInstance = axios.create({
  responseType: 'json',
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
  },
})

axiosInstance.CancelToken = axios.CancelToken
axiosInstance.isCancel = axios.isCancel

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.url.includes(REACT_APP_BASE_VA_API_URL)) {
      config.headers.Authorization = `Basic ${GLOBAL.VA_BASE_TOKEN}`
    } else {
      config.headers.Authorization = `Basic ${GLOBAL.BASE_TOKEN}`
    }

    return config
  },
  (error) => {
    logService.log(error, 'From request')
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'production') {
      const { Successful, Message, success, message } = response?.data

      if (!Successful && !success) {
        logService.log(Message || message, 'From response').then()
      }

      return response.data
    }

    return response.data
  },
  (error) => {
    logService.log(error, 'From response')
    return Promise.reject(error)
  }
)

export default axiosInstance
