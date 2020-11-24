import request from '@/utils/request'

export function getThumbUpListByUserId(userId){
  return request({
    url: `thumbUp/${userId}`,
    method: 'get'
  })
}

export function thumbUp(data){
  return request({
    url: `thumbUp`,
    method: 'put',
    data
  })
}
