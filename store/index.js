import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      user
    },
    getters
  })
}
// const store = new Vuex.Store({
//   modules: {
//     user
//   },
//   getters
// })

export default store
