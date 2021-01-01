import {setBgColor} from "../utils/theme";

export const state = () => {
  return {
    color: ''
  }
}

export const mutations = {
  SET_BG_COLOR(state, data) {
    state.color = data
    setBgColor(data)
  }
}

export const actions = {
  setBgColor({commit},val) {
    commit('SET_BG_COLOR',val)
  }
}
