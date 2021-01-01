import {getInfo} from "../api/user";
import {getCategories} from "../api/category";

export function setUserInfo(data){
  const userInfo = JSON.stringify(data);
  sessionStorage.setItem("userInfo",userInfo)
}

export async function getUserInfo(){
  let userInfo = sessionStorage.getItem("userInfo")
  if (userInfo === null) {
   await getInfo(null).then((data) =>{
      setUserInfo(data)
      return data;
    })
  }else {
    return JSON.parse(userInfo)
  }
}

export function removeUserInfo(){
  sessionStorage.removeItem("userInfo")
}

export function setCategory(data){
  sessionStorage.setItem("category",JSON.stringify(data))
}

export async function getCategory() {
  let category = sessionStorage.getItem("category")
  // console.log(category)
  if (category === null) {
    console.log("获取类别")
    await getCategories().then((data) => {
      category = data
      // console.log(category)
      setCategory(category)
      return category;
    })
  } else {
    return JSON.parse(category)
  }
}

export function resetUserInfo(data){
  const userInfo = JSON.stringify(data);
  const item = sessionStorage.getItem("userInfo");
  if (item != null) {
    sessionStorage.removeItem("userInfo")
  }
  sessionStorage.setItem("userInfo",userInfo)
}

