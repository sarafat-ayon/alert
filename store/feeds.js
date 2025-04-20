const ADD_FEED = 'ADD_FEED'
const REMOVE_FEED = 'REMOVE_FEED'
const CALULATE_STORAGE_COST = 'CALULATE_STORAGE_COST'
const SET_BASE_AND_OTHER_COST = 'SET_BASE_AND_OTHER_COST'
const SET_STORAGE_DATA = 'SET_STORAGE_DATA'
const SET_ENABLE_SECURITY = 'SET_ENABLE_SECURITY'
const SET_ENABLE_PAYMENT = 'SET_ENABLE_PAYMENT'
const SET_DISABLE_SECURITY_PAYMENT_TAB = 'SET_DISABLE_SECURITY_PAYMENT_TAB'


const state = () => ({
  feeds: [],
  cost: null,
  baseCost: 32.00,
  storageCost: 0.00,
  storage: {
    archiveFormat: '',
    autoDelete: '',
    autoDelivery: '',
    autoDeliveryEmail: '',
    autoDeliveryEmailFrequency: '',
    autoDeliveryCloud: '',
    autoDeliveryCloudFrequency: '',
  },
  securityTab: false,
  paymentTab: false,
})

const getters = {
  counter(state) {
    return state.feeds.length
  },
  total(state) {
    const total = state.feeds.reduce((total, { cost }) => {
      return total + cost
    }, 0)
    return parseFloat(total + state.baseCost + state.storageCost)
  },
  getArchiveFeeds(state) {
    return state.feeds
  },
  getStorageInfo(state) {
    return state.storage
  },
  securityStatus(state) {
    return state.securityTab
  },
  paymentStatus(state) {
    return state.paymentTab
  },
  archiveFeedBaseCost(state) {
    return state.cost
  },
}

const mutations = {
  [ADD_FEED](state, feed) {
    state.feeds.push(feed)
  },

  [REMOVE_FEED](state, feed) {
    const feedItem = state.feeds.find((item) => item.socialId + '-' + item.sourceName === feed.socialId + '-' + feed.sourceName)
    state.feeds.splice(state.feeds.indexOf(feedItem), 1)
  },
  [CALULATE_STORAGE_COST](state, payload) {
    state.storageCost = payload
  },
  [SET_BASE_AND_OTHER_COST](state, payload) {
    state.baseCost = parseFloat(payload.base)
    state.cost = payload
  },
  [SET_STORAGE_DATA](state, payload) {
    state.storage = payload
  },
  [SET_ENABLE_SECURITY](state) {
    state.securityTab = true
  },
  [SET_ENABLE_PAYMENT](state) {
    state.paymentTab = true
    state.securityTab = false
  },
  [SET_DISABLE_SECURITY_PAYMENT_TAB](state) {
    state.paymentTab = false
    state.securityTab = false
  },
}

const actions = {
  select({ commit, state }, feed) {
    const itemExists = state.feeds.find((item) => item.socialId + '-' + item.sourceName === feed.socialId + '-' + feed.sourceName)
    if (itemExists) return false
    feed.cost = state.cost[feed.sourceName.toLowerCase()]
    commit(ADD_FEED, feed)
  },

  remove({ commit, state }, feed) {
    commit(REMOVE_FEED, feed)
  },

  putStorageCost({ commit, state }, payload) {
    commit(CALULATE_STORAGE_COST, payload)
  },
  setCost({ commit, state }, payload) {
    commit(SET_BASE_AND_OTHER_COST, payload)
  },
  setStorageData({ commit, state }, payload) {
    commit(SET_STORAGE_DATA, payload)
  },
  enableSecurity({ commit }) {
    commit(SET_ENABLE_SECURITY)
  },
  enablePayment({ commit }) {
    commit(SET_ENABLE_PAYMENT)
  },
  disableSecurityPaymentTab({ commit }) {
    commit(SET_DISABLE_SECURITY_PAYMENT_TAB)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
