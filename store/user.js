const state = () => ({
  userInfo: null,
  newUserToken: null
})

const getters = {
  getUserInfo(state) {
    return state.userInfo
  },
  getNewUserToken(state) {
    return state.newUserToken
  },
}

const mutations = {
  ADD_NEW_USER_INFO: (state, payload) => {
    state.userInfo = payload
  },
  ADD_NEW_USER_TOKEN: (state, payload) => {
    state.newUserToken = payload
  },
}

const actions = {
  setNewUser: ({ commit }, payload) => {
    commit('ADD_NEW_USER_INFO', payload)
  },
  setNewUserToken: ({ commit }, payload) => {
    commit('ADD_NEW_USER_TOKEN', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
