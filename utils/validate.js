export function checkPhone(phone){
  return /^1[3456789]\d{9}$/.test(phone);

}

export function checkEmail(str){
  let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return re.test(str);

}
