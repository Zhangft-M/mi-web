import request from '@/utils/request'

export function getThumbUpListByUserId(userId){
  return request({
    url: `/miPost/thumbUp/${userId}`,
    method: 'get'
  })
}

export function thumbUp(data){
  return request({
    url: `/miPost/thumbUp`,
    method: 'put',
    data
  })
}
