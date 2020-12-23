import request from "../utils/request";
import Qs from "qs"

export function uploadImage(data){
  return request({
    url: '/miTool/pic/upload',
    method: 'post',
    data
  })
}

export function uploadBase64Image(data){
  return request({
    url:'/miTool/pic/upload/base64',
    method: 'post',
    data
  })
}

export function sendSms(val){
  const data = Qs.stringify(val)
  return request({
    url: '/miTool/tool/sms/sendCode',
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
