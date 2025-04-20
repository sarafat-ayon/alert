
const SET_GUEST_BLUR_ACTIVE_MODAL = 'SET_GUEST_BLUR_ACTIVE_MODAL'
const SET_CHECK_REQUEST = 'SET_CHECK_REQUEST'
const SET_GUEST_INSTAGRAM_MODAL = 'SET_GUEST_INSTAGRAM_MODAL'

const state = () => ({
  showGuestBlurActiveModal: true,
  checkRequest: false,
  showGuestInstagramModal: false,
})

const getters = {
  getGuestBlurActiveModal(state) {
    return state.showGuestBlurActiveModal
  },
}

const mutations = {
  [SET_GUEST_INSTAGRAM_MODAL](state, payload) {
    state.showGuestInstagramModal = payload
  },
  [SET_GUEST_BLUR_ACTIVE_MODAL](state, payload) {
    state.showGuestBlurActiveModal = payload
  },
  [SET_CHECK_REQUEST](state, payload) {
    state.checkRequest = payload
  },
}

const actions = {
    getGuestBlurModal({ commit }, payload) {
        commit(SET_GUEST_BLUR_ACTIVE_MODAL, payload)
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}
