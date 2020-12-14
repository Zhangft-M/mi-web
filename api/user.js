import request from '../utils/request'

export function login(data) {
  return request({
    url: '/miAuth/oauth/login',
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
    url: `/miUser/user/info/${userId}`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/miAuth/oauth/logout',
    method: 'post'
  })
}
