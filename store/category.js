export const state = () => {
  return {
    categoryList: []
  }
}

export const mutations = {
  SET_CATEGORY_LIST(state, data) {
    state.categoryList.push(data)
  }
}

export const actions = {
  setCategorise({commit}, data) {
    if (data != null) {
      commit("SET_CATEGORY_LIST", data)
    }
  }
}
