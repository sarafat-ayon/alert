const state = () => ({
  currentComponent: 'Service',
  showCreateGroup: false,
  showEditGroup: false,
  showProfile: false,
  changeBillingInfo: false,
  showInvoice: false,
  showBillingInfo: false,
})

const getters = {}

const mutations = {
  SET_BILLING_INFO(state, payload) {
    console.log(payload, 'payload')
    state.showBillingInfo = payload
  },
  SET_CURRENT_COMPONENT(state, payload) {
    state.currentComponent = payload
  },
  SET_SHOW_CREATE_GROUP(state, payload) {
    state.showCreateGroup = payload
  },
  SET_SHOW_EDIT_GROUP(state, payload) {
    state.showEditGroup = payload
  },
  SET_SHOW_PROFILE(state, payload) {
    state.showProfile = payload
  },
  SET_CHANGE_BILLING_INFO(state, payload) {
    state.changeBillingInfo = payload
  },
  SET_SHOW_INVOICE(state, payload) {
    state.showInvoice = payload
  },
}

const actions = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
