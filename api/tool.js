import request from "../utils/request";

export function uploadImage(data){
  return request({
    url: '/miTool/tool/upload/image',
    method: 'post',
    data
  })
}
