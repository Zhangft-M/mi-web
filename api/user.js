import request from '../utils/request'

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
    url: '/miUser/user/update',
    method: 'put',
    data
  })
}

export function changePassword(data){
  return request({
    url: '/miUser/user/changerPassword',
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
      userId: userId == null ? null : userId
    }
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
