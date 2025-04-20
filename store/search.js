const state = () => ({
  // searchResults: [],
  saveSearchAlertModal: false,
  showSavedSearchSideBar: false,
  searchFromHome: '',
})

const getters = {
  getHomeSearch(state) {
    return state.searchFromHome
  },
}

const mutations = {
  SET_SAVE_SEARCH_ALERT(state, payload) {
    state.saveSearchAlertModal = payload
  },
  SET_SAVE_SAERCH_MODAL(state, payload) {
    state.showSavedSearchSideBar = payload
  },
  SET_HOME_SEARCH(state, payload) {
    state.searchFromHome = payload
  }
}

const actions = {
  showSaveSearchAlert({ commit }, payload) {
    commit('SET_SAVE_SEARCH_ALERT', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
