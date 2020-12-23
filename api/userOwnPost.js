import request from "../utils/request";

export function getUserOwnPost(){
  return request({
    url: '/user/own/post',
    method: 'get'
  })
}

