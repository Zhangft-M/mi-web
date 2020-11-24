import {getCategories} from "@/api/category";

export const state = () => {
  return {
    categoryList: []
  }
}

export const mutations = {
  SET_CATEGORY_LIST(state, data) {
    state.categoryList = data
  }
}

export const actions = {
  setCategorise({commit}) {
    return new Promise((resolve, reject) => {
      getCategories().then((data)=>{
        commit("SET_CATEGORY_LIST", data)
        resolve(data)
      }).catch((error)=>{
        reject(error)
      })
    })
  }
}
