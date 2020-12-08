import request from '../utils/request'

export function login(data) {
  return request({
    url: '/miAuth/oauth/login',
    method: 'post',
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
