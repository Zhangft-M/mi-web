import {getFavoritesPostId} from '../api/favoritesPost'

export const state = ()=>{
  return {
    favoritesPostIds : []
  }
}

export const mutations = {
  SET_FAVORITES_POST_IDS(state,data){
    state.favoritesPostIds = data
  },
  ADD_FAVORITES_POST_ID(state,data){
    state.favoritesPostIds.push(data)
  },
  REMOVE_FAVORITES_POST_ID(state,data){
    const index = state.thumbUpIds.indexOf(data)
    state.favoritesPostIds.splice(index,1)
  }
}

export const actions = {
  //todo:登录时的操作
  getFavoritesPostId({commit}) {
    return new Promise((resolve, reject) => {
      getFavoritesPostId().then((data)=>{
        commit("SET_FAVORITES_POST_IDS", data)
        resolve(data)
      }).catch((error)=>{
        reject(error)
      })
    })
  },
  addFavoritesPostId({commit},data) {
    if (data != null){
      commit("ADD_FAVORITES_POST_ID", data)
    }
  },
  removeFavoritesPostId({commit},data) {
    if (data != null){
      commit("REMOVE_FAVORITES_POST_ID", data)
    }
  }
}
