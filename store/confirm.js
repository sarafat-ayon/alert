import { CHECK_VALID_PASSWORD } from "~/constants/urls"

const state = () => ({
  confirmModal: false,
  isValidPassword: false,
  showPasswordConfirmModal: false,
  showFromProfile: false,
  showFromCloseAccount: false,
  showFromSetPassword: false,
})

const mutations = {
  OPEN_CONFIRM_MODAL: (state) => {
    state.confirmModal = !state.confirmModal
  },
  SET_PASSWORD_VALIDITY: (state, payload) => {
    state.isValidPassword = payload
  },
  SET_PASSWORD_CONFIRM_MODAL: (state, payload) => {
    state.showPasswordConfirmModal = payload
  },
  SET_FROM_PROFILE: (state, payload) =>{
    state.showFromProfile = payload
  },
  SET_FROM_CLOSE_ACCOUNT: (state, payload) =>{
    state.showFromCloseAccount = payload
  },
  SET_FROM_SET_PASSWORD: (state, payload) =>{
    state.showFromSetPassword = payload
  },
}

const actions = {
  openConfirmModal: ({ commit }) => {
    commit('OPEN_CONFIRM_MODAL')
  },
  checkPasswordValidity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.$post(CHECK_VALID_PASSWORD, {
        password: payload.password
      })
        .then((response) => {
          if (response.status === 200) {
            commit('SET_PASSWORD_VALIDITY', true)
          } else {
            commit('SET_PASSWORD_VALIDITY', false)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
