
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
  setCategorise({commit}, data) {
    if (data != null) {
      console.log("设置状态:")
      console.log(data)
      commit("SET_CATEGORY_LIST", data)
    }
  }
}
