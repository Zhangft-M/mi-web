import request from '../utils/request'

export function getCategories(){
  return request({
    url: `/miPost/category`,
    method: 'get'
  })
}
