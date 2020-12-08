import request from '@/utils/request'

export function getCommentDataByPostId(postId){
  return request({
    url: `/miPost/comment/${postId}`,
    method: 'get'
  })
}

export function addComment(data){
  return request({
    url: `/miPost/comment`,
    method: 'post',
    data:data
  })
}
