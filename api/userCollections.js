import request from "../utils/request";
import Qs from "qs"

export function getUserCollections(){
  return request({
    url:'/miUser/user/collections/post/ids',
    method:'get'
  })
}

export function addUserCollections(data){
  return request({
    url: '/miUser/user/collections/post/add',
    method: 'post',
    data: Qs.stringify(data)
  })
}
