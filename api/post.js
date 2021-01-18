import request from '@/utils/request'

import {stringify} from 'qs'

export function getRecommendData() {
  return request(
    {
      url: `/miPost/post/recommend/v1`,
      method: 'get'
    }
  )
}

export function queryData(params) {
  return request(
    {
      url: `/miPost/post?${stringify(params, {indices: false})}`,
      method: 'get'
    }
  )
}

export function getDataById(postId) {
  return request({
    url: `/miPost/post/${postId}`,
    method: 'get'
  })
}

export function getByUserId(userId) {
  return request({
    url: `/miPost/post/userId/${userId}`,
    method: 'get'
  })
}

export function getUserCollectPost(userId) {
  return request({
    url: `/miPost/post/favorites/${userId}`,
    method:'get'
  })
}

export function addPost(data) {
  return request({
    url: '/miPost/post/add',
    method: 'post',
    data
  })
}

