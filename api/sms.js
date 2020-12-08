import request from "../utils/request";

export function sendSms(data){
  return request({
    url: '/miUser/user/sendSms',
    method: 'post',
    data
  })
}
