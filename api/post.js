import request from '@/utils/request'

import {stringify} from 'qs'

export function getRecommendData() {
  return request(
    {
      url: `/post/recommend`,
      method: 'get'
    }
  )
}

export function queryData(params) {
  return request(
    {
      url: `/post?${stringify(params, {indices: false})}`,
      method: 'get'
    }
  )
}

export function getDataById(postId) {
  return request({
    url: `/post/${postId}`,
    method: 'get'
  })
}
