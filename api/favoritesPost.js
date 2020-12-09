import request from "../utils/request";

export function getFavoritesPostId(){
  return request({
    url: '/miPost/favorites/post',
    method: 'get'
  })
}
