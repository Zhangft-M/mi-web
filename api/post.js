import request from '@/utils/request'

export function getRecommendData(){
  return request(
    {
      url : '/post/recommend',
      method: 'get'
    }
  )
}
