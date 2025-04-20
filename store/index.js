// import { USER_PROFILE } from "~/constants/urls"

// import NEW_SYSTEM_ALERT from "./modules/new-system-alert";

const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL'
const EXPAND_STARTER_MODAL = 'EXPAND_STARTER_MODAL'
const COLLAPSE_STARTER_MODAL = 'COLLAPSE_STARTER_MODAL'
const SHOW_SIGN_UP = 'SHOW_SIGN_UP'
const SET_STICKY = 'SET_STICKY'
const SET_HEADER_WIDTH = 'HEADER_WIDTH'
const MAXIMIZE_STARTER_MODAL = 'MAXIMIZE_STARTER_MODAL'
const STARTER_ACCOUNT_MAXIMIZED = 'STARTER_ACCOUNT_MAXIMIZED'
// const TOGGLE_SIDEBAR_MODAL = 'TOGGLE_SIDEBAR_MODAL'
const UPDATE_SETUP_CONTNET = 'UPDATE_SETUP_CONTNET'
const SET_STORAGE_FORMAT_SELECTED = 'SET_STORAGE_FORMAT_SELECTED'
const SET_STORAGE_FORM_SUBMIT = 'SET_STORAGE_FORM_SUBMIT'

const FORGET_PASSWORD_MODAL = 'FORGET_PASSWORD_MODAL'
const SET_EMAIL_VERIFY_MODAL = 'SET_EMAIL_VERIFY_MODAL'
const SET_GLOBAL_COLOR_PANEL = 'SET_GLOBAL_COLOR_PANEL'
const SET_PASSWORD_CONFIRM_EMAIL_VERIFY_MODAL = 'SET_PASSWORD_CONFIRM_EMAIL_VERIFY_MODAL'

const state = () => ({
  loginModal: false,
  starterExpanded: false,
  starterCollapse: false,
  showSignUp: false,
  isSticky: false,
  headerWidth: false,
  starterMaximized: false,
  starterAccountMaximized: false,
  // sidebarModal: false,
  setupContent: 'starter-button',
  isStorageFormatSelected: false,
  isStorageFormSubmit: false,
  socialProviders: [],
  socialProvidersInitial: [],
  pastMonths: [],
  savedSearches: [],
  archiveSettings: false,
  betaVersion: false,
  lockScreen: false,
  showForgetPasswordModal: false,
  emailVerifyModal: false,
  adminMail: 'mailto:admin@sharparchive.com',
  globalColorPanel: {
    backgroundColor: '#e4801d',
  },
  landingLoader: true,
  defaultImg: 'https://cdn.sharparchive.com/shared/default-avatar.jpg',
  showSideBar: false,
  passwordConfirmEmailVerifyModal: false,
  currentPayMethod: 'Automatic',
  currentPaymentSystem: 'PaymentOption',
  socialFeeds: [
    {
      id: 'all_feeds',
      name: 'All Feeds',
      mediaValue: true,
      media: [
        {
          id: 'social_media',
          mediaName: 'Social Media',
          mediaValue: true,
          mediaHeight: false,
          individualMedia: [],
        },
        {
          id: 'group',
          mediaName: 'Group',
          mediaValue: true,
          mediaHeight: false,
          individualMedia: [],
        },
        {
          id: 'name',
          mediaName: 'Name',
          mediaValue: true,
          mediaHeight: false,
          individualMedia: []
        },
      ],
    },
  ],
  searchSocialFeeds: [
    {
      id: 'all_feeds',
      name: 'All Feeds',
      mediaValue: true,
      media: [
        {
          id: 'social_media',
          mediaName: 'Social Media',
          mediaValue: true,
          mediaHeight: false,
          individualMedia: [],
        },
        {
          id: 'group',
          mediaName: 'Group',
          mediaValue: true,
          mediaHeight: false,
          individualMedia: [],
        },
      ],
    },
  ],
  editAllFeeds: false,
  dataSearch: false,
})

const getters = {
  getStorageFormatSelected(state) {
    return state.isStorageFormatSelected
  },
  getForgetPasswordModal(state) {
    return state.showForgetPasswordModal
  },
  currentPayment(state) {
    return state.currentPaymentSystem
  },
  socialFeeds(state) {
    return state.socialFeeds
  },
  searchSocialFeeds(state) {
    return state.searchSocialFeeds
  }
}

const mutations = {
  SET_EDIT_FEEDS(state, payload) {
    state.editAllFeeds = payload
  },
  SET_DATA_SEARCH(state, payload) {
    state.dataSearch = payload
  },
  [TOGGLE_LOGIN_MODAL](state, payload) {
    state.loginModal = payload
  },
  [SET_GLOBAL_COLOR_PANEL](state, payload) {
    state.globalColorPanel.backgroundColor = payload.backgroundColor
  },
  [EXPAND_STARTER_MODAL](state, payload) {
    state.starterExpanded = payload
  },
  [COLLAPSE_STARTER_MODAL](state, payload) {
    state.starterCollapse = payload
  },
  [SHOW_SIGN_UP](state, payload) {
    state.showSignUp = payload
  },
  [SET_STICKY](state, payload) {
    state.isSticky = payload
  },
  [SET_HEADER_WIDTH](state, payload) {
    state.headerWidth = payload
  },
  [MAXIMIZE_STARTER_MODAL](state, payload) {
    state.starterMaximized = payload
  },
  [STARTER_ACCOUNT_MAXIMIZED](state, payload) {
    state.starterAccountMaximized = payload
  },
  [UPDATE_SETUP_CONTNET](state, payload) {
    state.setupContent = payload
  },
  [SET_STORAGE_FORMAT_SELECTED](state, payload) {
    state.isStorageFormatSelected = payload
  },
  [SET_STORAGE_FORM_SUBMIT](state, payload) {
    state.isStorageFormSubmit = payload
  },
  SET_PAST_MONTHS(state, payload) {
    state.pastMonths = payload
  },
  SET_SAVED_SEARCH(state, payload) {
    state.savedSearches = payload.map((item) => {
      return {
        id: item.id,
        text: item.name,
        value: item.id,
      }
    })
  },
  SET_SEARCH_ITEM_STORE(state, payload) {
    state.savedSearches.unshift(payload)
  },
  SET_SAVED_SEARCH_UPDATE(state, payload) {
    state.savedSearches = state.savedSearches.map((item) => {
      if (Number(payload.id) === Number(item.id)) {
        return {
          id: payload.id,
          text: payload.text,
          value: payload.value,
        }
      }
      return item
    })
  },
  SET_SAVED_SEARCH_REMOVE(state, id) {
    state.savedSearches = state.savedSearches.filter((item) => {
      return Number(item.id) !== Number(id)
    })
  },
  SET_SOCIAL_PROVIDERS(state, payload) {
    state.socialProviders = JSON.parse(JSON.stringify(payload))
    state.socialProviders.forEach(item => {
      item.mediaValue = true
    })
    state.socialFeeds.forEach(element => {
      element.media.forEach(item => {
        if (item.id === 'social_media') {
          item.individualMedia = state.socialProviders
        }
      })
    });
    state.searchSocialFeeds.forEach(element => {
      element.media.forEach(item => {
        if (item.id === 'social_media') {
          item.individualMedia = state.socialProviders
        }
      })
    });
  },
  SET_SOCIAL_PROVIDERS_INITIAL(state, payload) {
    state.socialProvidersInitial = JSON.parse(JSON.stringify(payload))
    state.socialProvidersInitial.unshift({
      id: state.socialProvidersInitial.length + 1,
      text: 'All Feeds',
      value: 'all',
    })
  },
  SET_ALL_FEEDS_VALUE(state, payload) {
    state.socialFeeds.forEach(element => {
      element.media.forEach(item => {
        if (item.id === 'group') {
          item.individualMedia = payload.allGroups
        }
        if (item.id === 'name') {
          item.individualMedia = payload.allNames
        }
      })
    });
    state.searchSocialFeeds.forEach(element => {
      element.media.forEach(item => {
        if (item.id === 'group') {
          item.individualMedia = payload.allGroups
        }
      })
    });
  },
  ARCHIVE_SETTINGS_VISIBLITY(state, payload) {
    state.archiveSettings = payload
  },
  SET_LOCK_SCREEN(state, payload) {
    state.lockScreen = payload
  },
  SET_LANDING_LOADER(state, payload) {
    state.landingLoader = payload
  },
  [FORGET_PASSWORD_MODAL](state, payload) {
    state.showForgetPasswordModal = payload
  },
  [SET_EMAIL_VERIFY_MODAL](state, payload) {
    state.emailVerifyModal = payload
  },
  SET_SHOW_SIDE_BAR(state, payload) {
    state.showSideBar = payload
  },
  SET_PASSWORD_CONFIRM_EMAIL_VERIFY_MODAL(state, payload) {
    state.passwordConfirmEmailVerifyModal = payload
  },
  SET_CURRENT_PAY_METHOD(state, payload) {
    if (payload === 'Automatic') {
      state.currentPayMethod = payload
      state.currentPaymentSystem = 'PaymentOption'
    } else if (payload === 'Invoice') {
      state.currentPayMethod = payload
      state.currentPaymentSystem = 'PayWithApprovalCode'
    }
  },
  SET_CURRENT_PAYMENT_SYSTEM(state, payload) {
    if (state.currentPayMethod === 'Automatic' && (payload === 'PayWithCreditCard' || payload === 'PaymentOption')) {
      state.currentPaymentSystem = payload
    } else if (state.currentPayMethod === 'Invoice' && (payload === 'PayWithApprovalCode' || payload === 'PayWithPromoCode')) {
      state.currentPaymentSystem = payload
    } else if (state.currentPayMethod === 'Automatic' && payload === 'PayWithPromoCode') {
      state.currentPayMethod = 'Invoice'
      state.currentPaymentSystem = payload
    }
  },
}

const actions = {
  toggle_login_modal({ commit }, payload) {
    commit(TOGGLE_LOGIN_MODAL, payload)
  },
  expand_starter_modal({ commit }, payload) {
    commit(EXPAND_STARTER_MODAL, payload)
  },
  collapse_starter_modal({ commit }, payload) {
    commit(COLLAPSE_STARTER_MODAL, payload)
  },
  show_sign_up({ commit }, payload) {
    commit(SHOW_SIGN_UP, payload)
  },
  set_sticky({ commit }, payload) {
    commit(SET_STICKY, payload)
  },
  set_header_width({ commit }, payload) {
    commit(SET_HEADER_WIDTH, payload)
  },
  maximize_starter_modal({ commit }, payload) {
    commit(MAXIMIZE_STARTER_MODAL, payload)
  },
  starter_account_maximized({ commit }, payload) {
    commit(STARTER_ACCOUNT_MAXIMIZED, payload)
  },
  updateSetupContent({ commit }, payload) {
    commit(UPDATE_SETUP_CONTNET, payload)
  },
  setStorageFormatSelect({ commit }, payload) {
    commit(SET_STORAGE_FORMAT_SELECTED, payload)
  },
  setStorageFormSubmit({ commit }, payload) {
    commit(SET_STORAGE_FORM_SUBMIT, payload)
  },
  setPastMonths({ commit }, payload) {
    commit('SET_PAST_MONTHS', payload)
  },
  setSaveSearches({ commit }, payload) {
    commit('SET_SAVED_SEARCH', payload)
  },
  storeSearch({ commit }, payload) {
    commit('SET_SEARCH_ITEM_STORE', payload)
  },
  updateSavedSearch({ commit }, payload) {
    commit('SET_SAVED_SEARCH_UPDATE', payload)
  },
  removeSavedSearch({ commit }, payload) {
    commit('SET_SAVED_SEARCH_REMOVE', payload)
  },
  setAllSocialProviders({ commit }, payload) {
    commit('SET_SOCIAL_PROVIDERS', payload)
    commit('SET_SOCIAL_PROVIDERS_INITIAL', payload)
  },
  showArchiveSettings({ commit }, payload) {
    commit('ARCHIVE_SETTINGS_VISIBLITY', payload)
  },
  showForgetPassword({ commit }, payload) {
    commit(FORGET_PASSWORD_MODAL, payload)
  },
  showEmailVerifyModal({ commit }, payload) {
    commit(SET_EMAIL_VERIFY_MODAL, payload)
  },
  showPasswordConfirmEmailVerifyModal({ commit }, payload) {
    commit(SET_PASSWORD_CONFIRM_EMAIL_VERIFY_MODAL, payload)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
