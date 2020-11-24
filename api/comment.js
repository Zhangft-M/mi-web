import request from '@/utils/request'

export function getCommentDataByPostId(postId){
  return request({
    url: `/comment/${postId}`,
    method: 'get'
  })
}

export function addComment(data){
  return request({
    url: `/comment`,
    method: 'post',
    data:data
  })
}
