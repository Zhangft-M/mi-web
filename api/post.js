import request from '@/utils/request'

import {stringify} from 'qs'

export function getRecommendData() {
  return request(
    {
      url: `/miPost/post/recommend`,
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
