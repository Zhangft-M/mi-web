import {login, logout, getInfo, phoneNumberLogin} from '../api/user'
import {getToken, setToken, removeToken} from '../utils/auth'
import {setUserInfo} from "../utils/sessionUtils";


export const state = () => {
  return {
    token: '',
    userInfo: {}
  }
}

const defaultUserInfo = null
// export const state = getDefaultState()

export const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state.token, "")
    Object.assign(state.userInfo, {})
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, id) => {
    state.userInfo.userId = id
  },
  SET_USER_INFO: (state, userInfo) => {
    // console.log("获取到的用户的信息")
    // console.log(userInfo)
    state.userInfo = userInfo
    // setUserInfo(userInfo)
  },
  RESET_USER_INFO: (state) => {
    Object.assign(state.userInfo, {})
  }
}

export const actions = {
  // user login
  login({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(data => {
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  verifyCodeLogin({commit}, loginData) {
    return new Promise((resolve, reject) => {
      phoneNumberLogin(loginData).then(data => {
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  setUserInfo({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      if (userInfo != null) {
        commit('SET_USER_INFO', userInfo)
        resolve()
      } else {
        reject()
      }
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      const userInfo = state.userInfo
      if (userInfo == null) {
        getInfo(null).then(data => {
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          /*const { id, name, avatar } = data
          commit('SET_USERID',id)
          commit('SET_NAME', name)*/
          // console.log(data)
          commit('SET_USER_INFO', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      }
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
        removeToken() // must remove  token  first
        commit('RESET_STATE')
        resolve()
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  resetUserInfo({commit}) {
    return new Promise(resolve => {
      commit('RESET_USER_INFO')
      resolve()
    })
  }
}

/*export default {
  namespaced: true,
  state,
  mutations,
  actions
}*/

