import request from '@/utils/request'

export function getThumbUpList(){
  return request({
    url: `/miPost/thumbUp/`,
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
