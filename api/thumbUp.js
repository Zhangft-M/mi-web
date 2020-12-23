import request from '@/utils/request'

export function getThumbUpList(){
  return request({
    url: `/miUser/user/thumbUp/`,
    method: 'get'
  })
}

export function thumbUp(data){
  return request({
    url: `/miUser/user/thumbUp/`,
    method: 'put',
    data
  })
}
