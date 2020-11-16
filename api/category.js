import request from '../utils/request'

export function getCategories(){
  return request({
    url: `/category`,
    method: 'get'
  })
}
