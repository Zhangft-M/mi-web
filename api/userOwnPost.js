import request from "../utils/request";

export function getUserOwnPost(postId){
  return request({
    url: '/miUser/user/own/post',
    method: 'get',
    params:{postId:postId}
  })
}

