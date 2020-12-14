import request from "../utils/request";

export function sendSms(data){
  return request({
    url: '/miTool/tool/sms/sendSms',
    method: 'post',
    data
  })
}

export function validateVerifyCode(data) {
  return request({
    url: '/miTool/tool/sms/validate/verifyCode',
    method: 'post',
    data
  })
}
