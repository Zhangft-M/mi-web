import axios from 'axios'
import {Notification} from 'element-ui'
import Cookies from 'js-cookie'
import Qs from "qs"
import {getToken, removeToken} from "./auth";
import {mixinToast} from "../components/sweetalert/mixinSweetalert";

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
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
      if (response.data.error_description != null) {
        console.log(response.data.error_description)
        mixinToast.fire({
          titleText: response.data.error_description,
          icon:"error"
        })
      }else {
        mixinToast.fire({
          title: response.data,
          icon:"error"
        })
      }

     /* Notification.error({
        title: response.data,
        position: "bottom-right"
      })*/
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
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        mixinToast.fire({
          titleText: '请求超时'
        })
        return Promise.reject(error)
      }
    }
    if (code !== 0) {
      if (code === 401) {
          mixinToast.fire({
            titleText: '未登录或者登录过期,请重新登录'
          }).then(()=>{
            removeToken()
            this.$router.push('/login')
          })
      } else if (code === 403) {
        this.$router.push({ path: '/401' })
      } else {
        // console.log(error.response.data.error_description)
        if (error.response.data.error_description !== undefined){
          // const errorMsg = JSON.parse(error.response.data.error_description)
          // console.log(errorMsg)
          console.log("未知异常")
          console.log(error.response.data.error_description)
          mixinToast.fire({
            title:error.response.data.error_description,
            position:"top-end"
          })
        }else {
          const errorMsg = error.response.data.body == null ? error.response.data : error.response.data.body
          console.log(errorMsg)
          if (errorMsg !== undefined) {
            mixinToast.fire({
              titleText: errorMsg,
              position: 'top-end',
              icon:'error'
            })
          }
        }

      }
    } else {
      if (error.response.data.error_description != null){
        mixinToast.fire({
          titleText:error.response.data.error_description,
          icon:"error"
        })
      }else {
        mixinToast.fire({
          titleText:error.response.data,
          icon:"error"
        })
      }
    }
    return Promise.reject(error.response.data.body == null ? error.response.data : error.response.data.body)
  }
)

export default service
