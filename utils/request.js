import axios from 'axios'
import {MessageBox, Message, Notification} from 'element-ui'
// import store from '@/store'
import Cookies from 'js-cookie'
import getters from '@/store/getters'
import {getToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:1005/mi-community', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
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
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message,
        position: "bottom-right"
      })
      return Promise.reject('error')
    } else {
      // console.log(response)
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
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
    if (code) {
      if (code === 401) {
        store.dispatch('LogOut').then(() => {
          // 用户登录界面提示
          Cookies.set('point', 401)
          location.reload()
        })
      } else if (code === 403) {
        this.$router.push({ path: '/401' })
      } else {
        const errorMsg = error.response.data.message
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
        title: '接口请求失败',
        duration: 5000,
        position: "bottom-right"
      })
    }
    return Promise.reject(error)
  }
)

export default service
