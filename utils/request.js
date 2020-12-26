import axios from 'axios'
import {Notification} from 'element-ui'
import Cookies from 'js-cookie'
import {getToken} from "./auth";

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getToken() != null) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = "Bearer " + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const code = response.status
    // console.log(code)
    // console.log(response)
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.data,
        position: "bottom-right"
      })
      return Promise.reject('error')
    } else {
      // console.log(response)
      return response.data
    }
  },
  error => {
    //console.log(error.response)
    // console.log(error.response.status)
    let code = 0
    try {
      code = error.response.status
      console.log(error.response)
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 5000,
          position: "bottom-right"
        })
        return Promise.reject(error)
      }
    }
    if (code !== 0) {
      if (code === 401) {
          console.log("未认证")
      } else if (code === 403) {
        this.$router.push({ path: '/401' })
      } else {
        const errorMsg = error.response.data
        if (errorMsg !== undefined) {
          Notification.error({
            title: errorMsg,
            duration: 5000,
            position: "bottom-right"
          })
        }
      }
    } else {
      Notification.error({
        title: error.response.data,
        duration: 5000,
        position: "bottom-right"
      })
    }
    return Promise.reject(error)
  }
)

export default service
