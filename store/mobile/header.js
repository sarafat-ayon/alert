const state = () => ({
  headerConfig: {
    barColor: 'text-orange-dark',
    icon: 'home',
    iconColor: 'text-orange-dark',
    text: 'Home',
    dropdownMenuColor: 'home',
    skew: false,
  },
  searchBar: false,
  mobileSaveSearch: false,
  filter: false,
  addAlert: false,
  currentComponent: 'Service',
  hideMobileHeader: false,
  overlay: false,
  squeeze: false,
  searchLatestArchive: '',
  mobileHomeSearchField: false,
  cardInfo: false,
  editFeed: false,
  drag: true,
  addFeed: false,
  addFeedFinishBtn: false,
  fadeHome: false,
  fadeArchive: false,
  fadeSearch: false,
  fadeAlert: false,
  fadeSettings: false,
  fadeHelp: false,
  showBlurAndActive: false,
  showPayment: false,
  getFbAuthData: null,
  updateAddFeed: false,
  // getFbAuthData: {
  //   profile_id: "189773103283368",
  //   items: [
  // {
  //   "id": "114205494378718",
  //   "name": "Abdur Rahim",
  //   "username": "test.devxhub@gmail.com",
  //   "picture": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=114205494378718&height=50&width=50&ext=1645524424&hash=AeQlzHsvIMKrv95gpr0",
  //   "type": "Profile",
  //   "added": true
  // },
  // {
  //   "id": "103338412240799",
  //   "name": "Learning",
  //   "username": "Learning.DevXhub",
  //   "picture": "https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-1/cp0/c19.0.50.50a/p50x50/269742633_103338698907437_6809618924833851933_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=y3h31jMsIrcAX83444w&_nc_ht=scontent-ort2-1.xx&edm=AP4hL3IEAAAA&oh=00_AT-XsqXm3lp8V9D4ZNDebTFrGDGU8pacpoy3Gcj0ItAO4Q&oe=61F14DE4",
  //   "type": "Page",
  //   "added": true
  // },
  // {
  //   "id": "103566562232065",
  //   "name": "Free Photography Free Photography Free Photography",
  //   "username": "Free-Photography-103566562232065",
  //   "picture": "https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-1/cp0/c0.0.50.50a/p50x50/271843680_140680268397907_5250526606013741935_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=Mh3xM2DWi0kAX-tYNJQ&_nc_ht=scontent-ort2-1.xx&edm=AP4hL3IEAAAA&oh=00_AT-nZr-296ZMCX6Z0zrePLyrNN2CHdP-6k6SybvPne2edQ&oe=61F175E6",
  //   "type": "Page",
  //   "added": true
  // },
  // {
  //   "id": "104639184828240",
  //   "name": "কারুকাজ",
  //   "username": "of.papercrafts",
  //   "picture": "https://scontent-ort2-1.xx.fbcdn.net/v/t1.6435-1/cp0/p50x50/127186265_104640354828123_3164567582884152631_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=CLNuwTxfo-QAX_ATzv8&_nc_ht=scontent-ort2-1.xx&edm=AP4hL3IEAAAA&oh=00_AT92KctjHDmcDiYMjdJ78D5VSJ-v8r0CpRGuwenG6yrfDw&oe=62128FD3",
  //   "type": "Page",
  //   "added": true
  // },
  // {
  //   "id": "1107340529807641",
  //   "name": "Karukaj Karukaj Karukaj",
  //   "username": "1107340529807641",
  //   "picture": "https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/cp0/c19.0.50.50a/p50x50/269981206_137846878681246_8912314921097945228_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ac9ee4&_nc_ohc=2W7W6AquZkEAX9y8s9Z&_nc_ht=scontent-ort2-1.xx&edm=AP4hL3IEAAAA&oh=00_AT-0D8XOQCmOh7aX_enkhFIDu3K5G-a05J8i1rp5wS6pHg&oe=61F210C7",
  //   "type": "Group",
  //   "added": true
  // }
  //   ]
  // },
  archiveFbData: false,
  providerName: '',
})

const getters = {
  getHeaderConfig(state) {
    return state.headerConfig
  },
  showBlurActiveModal(state) {
    return state.showBlurAndActive
  },
  getLatestArchiveSearchText(state) {
    return state.searchLatestArchive
  },
  getShowSearchBar(state) {
    return state.searchBar
  },
  getShowMobileSaveSearchBar(state) {
    return state.mobileSaveSearch
  },
  getShowFilter(state) {
    return state.filter
  },
  getShowAddAlert(state) {
    return state.addAlert
  },
  getCurrentComponent(state) {
    return state.currentComponent
  },
  getOverlay(state) {
    return state.overlay
  },
  getHideMobileHeader(state) {
    return state.hideMobileHeader
  },
  setClearField(state) {
    return state.clearField
  },
  getSqueeze(state) {
    return state.squeeze
  },
  getMobileHomeSearchField(state) {
    return state.mobileHomeSearchField
  },
  getCardInfo(state) {
    return state.cardInfo
  },
  getEditFeed(state) {
    return state.editFeed
  },
  getDrag(state) {
    return state.drag
  },
  getAddFeed(state) {
    return state.addFeed
  },
  getUpdateAddFeed(state) {
    return state.updateAddFeed
  },
  getHomePage(state) {
    return state.fadeHome
  },
  getArchivePage(state) {
    return state.fadeArchive
  },
  getSearchPage(state) {
    return state.fadeSearch
  },
  getAlertPage(state) {
    return state.fadeAlert
  },
  getSettingsPage(state) {
    return state.fadeSettings
  },
  getHelpPage(state) {
    return state.fadeHelp
  },
  getPayment(state) {
    return state.showPayment
  },
  getArchiveFbData(state) {
    return state.archiveFbData
  },
  getAddFeedFinishBtn(state) {
    return state.addFeedFinishBtn
  },
}

const mutations = {
  SET_ARCHIVE_FB_DATA(state, payload) {
    state.archiveFbData = payload
  },
  SET_LATEST_ARCHIVE_SEARCH(state, payload) {
    state.searchLatestArchive = payload
  },
  ADD_HEADER_CONFIG(state, config) {
    state.headerConfig = config
  },
  SHOW_SEARCH_BAR(state) {
    state.searchBar = true
  },
  CLOSE_SEARCH_BAR(state) {
    state.searchBar = false
  },
  SHOW_MOBILE_SAVE_SEARCH(state) {
    state.mobileSaveSearch = true
  },
  CLOSE_MOBILE_SAVE_SEARCH(state) {
    state.mobileSaveSearch = false
  },
  SHOW_FILTER(state) {
    state.filter = true
  },
  CLOSE_FILTER(state) {
    state.filter = false
  },
  SHOW_ADD_ALERT(state) {
    state.addAlert = true
  },
  CLOSE_ADD_ALERT(state) {
    state.addAlert = false
  },
  SET_CURRENT_COMPONENT(state, payload) {
    state.currentComponent = payload
  },
  SHOW_MOBILE_HEADER(state) {
    state.currentComponent = 'Service'
    state.hideMobileHeader = false
  },
  CLOSE_MOBILE_HEADER(state) {
    state.hideMobileHeader = true
  },
  SET_MOBILE_NEW_SYSTEM_ALERT(state) {
    state.searchBar = true
  },
  REMOVE_OVERLAY(state) {
    state.searchBar = false
    state.filter = false
    state.addAlert = false
    state.overlay = false
  },
  SHOW_OVERLAY(state) {
    state.overlay = true
  },
  SET_SQUEEZE(state) {
    state.squeeze = true
  },
  REMOVE_SQUEEZE(state) {
    state.squeeze = false
  },
  SET_HOME_MOBILE_SEARCH_FIELD(state, payload) {
    if (payload) {
      state.mobileHomeSearchField = payload
    } else {
      state.mobileHomeSearchField = false
      state.searchLatestArchive = ''
    }
  },
  SET_CARD_INFO(state) {
    state.cardInfo = true
  },
  REMOVE_CARD_INFO(state) {
    state.cardInfo = false
  },
  SHOW_EDIT_FEED(state) {
    state.editFeed = true
  },
  REMOVE_EDIT_FEED(state) {
    state.editFeed = false
  },
  SHOW_CUSTOM_PRICE(state) {
    state.drag = false
  },
  REMOVE_CUSTOM_PRICE(state) {
    state.drag = true
  },
  SHOW_ADD_FEED(state) {
    state.addFeed = true
  },
  REMOVE_ADD_FEED(state) {
    state.addFeed = false
  },
  SHOW_ADD_FEED_FINISH_BTN(state) {
    state.addFeedFinishBtn = true
  },
  REMOVE_ADD_FEED_FINISH_BTN(state) {
    state.addFeedFinishBtn = false
  },
  SHOW_UPDATE_ADD_FEED(state) {
    state.updateAddFeed = true
  },
  REMOVE_UPDATE_ADD_FEED(state) {
    state.updateAddFeed = false
  },
  SET_HOME_PAGE(state) {
    state.fadeHome = true
  },
  REMOVE_HOME_PAGE(state) {
    state.fadeHome = false
  },
  SET_ARCHIVE_PAGE(state) {
    state.fadeArchive = true
  },
  REMOVE_ARCHIVE_PAGE(state) {
    state.fadeArchive = false
  },
  SET_SEARCH_PAGE(state) {
    state.fadeSearch = true
  },
  REMOVE_SEARCH_PAGE(state) {
    state.fadeSearch = false
  },
  SET_ALERT_PAGE(state) {
    state.fadeAlert = true
  },
  REMOVE_ALERT_PAGE(state) {
    state.fadeAlert = false
  },
  SET_SETTINGS_PAGE(state) {
    state.fadeSettings = true
  },
  REMOVE_SETTINGS_PAGE(state) {
    state.fadeSettings = false
  },
  SET_HELP_PAGE(state) {
    state.fadeHelp = true
  },
  REMOVE_HELP_PAGE(state) {
    state.fadeHelp = false
  },
  BLUR_ACTIVE_FEED_MODAL(state, payload) {
    state.showBlurAndActive = payload
  },
  SET_PAYMENT(state) {
    state.showPayment = true
  },
  REMOVE_PAYMENT(state) {
    state.showPayment = false
  },
  SET_FB_AUTH_DATA(state, payload) {
    state.getFbAuthData = payload
  },
  SET_PROVIDER_NAME(state, payload) {
    state.providerName = payload
  },
}

const actions = {
  setArchiveFbData({ commit }, payload) {
    commit('SET_ARCHIVE_FB_DATA', payload)
  },
  setHeaderConfig({ commit }, config) {
    commit('ADD_HEADER_CONFIG', config)
  },
  showSearchBar({ commit }) {
    commit('SHOW_SEARCH_BAR')
  },
  searchLatestArchive({ commit }, payload) {
    commit('SET_LATEST_ARCHIVE_SEARCH', payload)
  },
  closeMobileSearchBar({ commit }) {
    commit('CLOSE_SEARCH_BAR')
  },
  showMobileSaveSearch({ commit }) {
    commit('SHOW_MOBILE_SAVE_SEARCH')
  },
  closeMobileSaveSearch({ commit }) {
    commit('CLOSE_MOBILE_SAVE_SEARCH')
  },
  showFilter({ commit }) {
    commit('SHOW_FILTER')
  },
  closeFilter({ commit }) {
    commit('CLOSE_FILTER')
  },
  showAddAlert({ commit }) {
    commit('SHOW_ADD_ALERT')
  },
  closeAddAlert({ commit }) {
    commit('CLOSE_ADD_ALERT')
  },
  setCurrentComponent({ commit }, payload) {
    commit('SET_CURRENT_COMPONENT', payload)
  },
  showMobileHeader({ commit }) {
    commit('SHOW_MOBILE_HEADER')
  },
  closeMobileHeader({ commit }) {
    commit('CLOSE_MOBILE_HEADER')
  },
  showMobileNewSystemAlertBar({ commit }) {
    commit('SET_MOBILE_NEW_SYSTEM_ALERT')
  },
  removeOverlay({ commit }) {
    commit('REMOVE_OVERLAY')
  },
  showOverlay({ commit }) {
    commit('SHOW_OVERLAY')
  },
  setSqueeze({ commit }) {
    commit('SET_SQUEEZE')
  },
  removeSqueeze({ commit }) {
    commit('REMOVE_SQUEEZE')
  },
  setHomeMobileSearchField({ commit }, payload) {
    commit('SET_HOME_MOBILE_SEARCH_FIELD', payload)
  },
  setCard({ commit }) {
    commit('SET_CARD_INFO')
  },
  removeCard({ commit }) {
    commit('REMOVE_CARD_INFO')
  },
  showEditFeed({ commit }) {
    commit('SHOW_EDIT_FEED')
  },
  removeEditFeed({ commit }) {
    commit('REMOVE_EDIT_FEED')
  },
  showCustomPrice({ commit }) {
    commit('SHOW_CUSTOM_PRICE')
  },
  removeCustomPrice({ commit }) {
    commit('REMOVE_CUSTOM_PRICE')
  },
  showAddFeed({ commit }) {
    commit('SHOW_ADD_FEED')
  },
  removeAddFeed({ commit }) {
    commit('REMOVE_ADD_FEED')
  },
  showUpdateAddFeed({ commit }) {
    commit('SHOW_UPDATE_ADD_FEED')
  },
  removeUpdateAddFeed({ commit }) {
    commit('REMOVE_UPDATE_ADD_FEED')
  },
  setHomePage({ commit }) {
    commit('SET_HOME_PAGE')
  },
  removeHomePage({ commit }) {
    commit('REMOVE_HOME_PAGE')
  },
  setArchivePage({ commit }) {
    commit('SET_ARCHIVE_PAGE')
  },
  removeArchivePage({ commit }) {
    commit('REMOVE_ARCHIVE_PAGE')
  },
  setSearchPage({ commit }) {
    commit('SET_SEARCH_PAGE')
  },
  removeSearchPage({ commit }) {
    commit('REMOVE_SEARCH_PAGE')
  },
  setAlertPage({ commit }) {
    commit('SET_ALERT_PAGE')
  },
  removeAlertPage({ commit }) {
    commit('REMOVE_ALERT_PAGE')
  },
  setSettingsPage({ commit }) {
    commit('SET_SETTINGS_PAGE')
  },
  removeSettingsPage({ commit }) {
    commit('REMOVE_SETTINGS_PAGE')
  },
  setHelpPage({ commit }) {
    commit('SET_HELP_PAGE')
  },
  removeHelpPage({ commit }) {
    commit('REMOVE_HELP_PAGE')
  },
  showBlurAndActive({ commit }, payload) {
    commit('BLUR_ACTIVE_FEED_MODAL', payload)
  },
  setPayment({ commit }) {
    commit('SET_PAYMENT')
  },
  removePayment({ commit }) {
    commit('REMOVE_PAYMENT')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
