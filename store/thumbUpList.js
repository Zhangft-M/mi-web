import da from "element-ui/src/locale/lang/da";
import {getThumbUpList} from "../api/thumbUp";

export const state = ()=>{
  return {
    thumbUpIds : []
  }
}

export const mutations = {
  SET_THUMB_UP_IDS(state,data){
    state.thumbUpIds = data
  },
  ADD_THUMB_UP_ID(state,data){
    state.thumbUpIds.push(data)
  },
  REMOVE_THUMB_UP_ID(state,data){
    const index = state.thumbUpIds.indexOf(data)
    state.thumbUpIds.splice(index,1)
  }
}

export const actions = {
  //todo:登录时的操作
  setThumbUpIds({commit}) {
    return new Promise((resolve, reject) => {
      getThumbUpList().then((data)=>{
        commit("SET_THUMB_UP_IDS", data)
        resolve(data)
      }).catch((error)=>{
        reject(error)
      })
    })
  },
  addThumbUpId({commit},data) {
    if (data != null){
      commit("ADD_THUMB_UP_ID", data)
    }
  },
  removeThumbUpId({commit},data) {
    if (data != null){
      commit("REMOVE_THUMB_UP_ID", data)
    }
  }
}
