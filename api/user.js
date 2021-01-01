import request from '../utils/request'
import Qs from 'qs'

export function login(data) {
  return request({
    url: '/miAuth/oauth/token',
    method: 'post',
    data
  })
}

export function registe(data) {
  return request({
    url: '/miUser/user/register',
    method: 'post',
    data
  })
}

export function updateUserInfo(data) {
  return request({
    url: `/miUser/user/update`,
    method: 'put',
    data:Qs.stringify(data)
  })
}

export function changePassword(data){
  return request({
    url: '/miUser/user/changePassword',
    method: 'put',
    data
  })
}

export function phoneNumberLogin(data) {
  return request({
    url: '/miAuth//verifyCode/login',
    method:'post',
    data
  })
}

export function getInfo(userId) {
  return request({
    url: `/miUser/user/info/`,
    method: 'get',
    params:{
      userId: userId == null ? '' : userId
    }
  })
}

export function getInfoWithNoId() {
  return request({
    url: `/miUser/user/info/`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/miAuth/oauth/logout',
    method: 'post'
  })
}

export function cancelUser(data) {
  return request({
    url: '/miUser/user/cancel',
    method: 'post',
    data
  })
}

export function validatePasswordVerifyCode(data) {
  return request({
    url: '/miUser/user/checkUser/phoneNumber',
    method: 'post',
    data: Qs.stringify(data)
  })
}
