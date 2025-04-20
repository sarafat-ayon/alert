const LOGIN_BUTTON_TRANSITION = 'LOGIN_BUTTON_TRANSITION'
const SUBMIT_BUTTON_TRANSITION = 'SUBMIT_BUTTON_TRANSITION'
const LOGIN_FORM_TRANSITION = 'LOGIN_FORM_TRANSITION'
const SUCCESSFULL = 'SUCCESSFULL'
const AFTER_LOADING = 'AFTER_LOADING'
const HOME = 'HOME'
const SIDEBAR_MENU = 'SIDEBAR_MENU'
const CIRCLE = 'CIRCLE'
const SIDEBAR = 'SIDEBAR'
const HOME_CIRCLE = 'HOME_CIRCLE'
const LOGIN_CIRCLE = 'LOGIN_CIRCLE'
const SLIDE_LEFT = 'SLIDE_LEFT'
const SHOW_LOGO = 'SHOW_LOGO'
const HEADER = 'HEADER'
const WIDTH_INCREASE = 'WIDTH_INCREASE'
const FULL_WIDTH = 'FULL_WIDTH'
const HOME_SIDE_MENU = 'HOME_SIDE_MENU'
const ALL_SIDE_MENU = 'ALL_SIDE_MENU'
const SHOW_HOME = 'SHOW_HOME'
const HOME_MENU_TEXT = 'HOME_MENU_TEXT'
const SHOW_HOME_CONTENT = 'SHOW_HOME_CONTENT'
const HOME_WRAPPER = 'HOME_WRAPPER'
const SHOW_LOGO_TEXT = 'SHOW_LOGO_TEXT'
const HEADER_TEXT = 'HEADER_TEXT'
const LOADING_TEXT = 'LOADING_TEXT'

const WIDTH_DECRESE = 'WIDTH_DECRESE'
const SLIDE_RIGHT = 'SLIDE_RIGHT'
const SLIDE_FULL_RIGHT = 'SLIDE_FULL_RIGHT'
const SHOW_LOGIN = 'SHOW_LOGIN'
const LANDING_CONTENT = 'LANDING_CONTENT'
const AFTER_LOGOUT = 'AFTER_LOGOUT'
const TEXT_LOADING = 'TEXT_LOADING'

const state = () => ({
    loginButtonTransition: false,
    submitButtonTransition: false,
    loginFormTransition: false,
    successfull: false,
    afterLoading: false,
    home: false,
    sidebarMenu: false,
    circle: false,
    sidebar: false,
    homeCircle: false,
    loginCircle: true,
    slideLeft: false,
    showLogo: false,
    header: false,
    widthIncrease: false,
    fullWidth: false,
    homeSideMenu: false,
    allSideMenu: false,
    showHome: false,
    homeMenuText: false,
    showHomeContent: true,
    homeWrapper: true,
    showLogoText: true,
    headerText: false,
    loadingText: false,

    widthDecrese: false,
    slideRight: false,
    slideFullRight: false,
    showLogin: false,
    landingContent: false,
    afterLogout: false,
    textLoading: false,
})

const getters = {
    getStorageFormatSelected(state) {
        return state.isStorageFormatSelected
    },
    getHomeContent(state) {
        return state.showHomeContent
    }
}

const mutations = {
    [LOGIN_BUTTON_TRANSITION](state, payload) {
        state.loginButtonTransition = payload
    },
    [SUBMIT_BUTTON_TRANSITION](state, payload) {
        state.submitButtonTransition = payload
    },
    [LOGIN_FORM_TRANSITION](state, payload) {
        state.loginFormTransition = payload
    },
    [SUCCESSFULL](state, payload) {
        state.successfull = payload
    },
    [AFTER_LOADING](state, payload) {
        state.afterLoading = payload
    },
    [HOME](state, payload) {
        state.home = payload
    },
    [SIDEBAR_MENU](state, payload) {
        state.sidebarMenu = payload
    },
    [CIRCLE](state, payload) {
        state.circle = payload
    },
    [SIDEBAR](state, payload) {
        state.sidebar = payload
    },
    [HOME_CIRCLE](state, payload) {
        state.homeCircle = payload
    },
    [LOGIN_CIRCLE](state, payload) {
        state.loginCircle = payload
    },
    [SLIDE_LEFT](state, payload) {
        state.slideLeft = payload
    },
    [SHOW_LOGO](state, payload) {
        state.showLogo = payload
    },
    [HEADER](state, payload) {
        state.header = payload
    },
    [WIDTH_INCREASE](state, payload) {
        state.widthIncrease = payload
    },
    [FULL_WIDTH](state, payload) {
        state.fullWidth = payload
    },
    [HOME_SIDE_MENU](state, payload) {
        state.homeSideMenu = payload
    },
    [ALL_SIDE_MENU](state, payload) {
        state.allSideMenu = payload
    },
    [SHOW_HOME](state, payload) {
        state.showHome = payload
    },
    [HOME_MENU_TEXT](state, payload) {
        state.homeMenuText = payload
    },
    [SHOW_HOME_CONTENT](state, payload) {
        state.showHomeContent = payload
    },
    [HOME_WRAPPER](state, payload) {
        state.homeWrapper = payload
    },
    [SHOW_LOGO_TEXT](state, payload) {
        state.showLogoText = payload
    },
    [HEADER_TEXT](state, payload) {
        state.headerText = payload
    },
    [LOADING_TEXT](state, payload) {
        state.loadingText = payload
    },


    [WIDTH_DECRESE](state, payload) {
        state.widthDecrese = payload
    },

    [SLIDE_RIGHT](state, payload) {
        state.slideRight = payload
    },
    [SLIDE_FULL_RIGHT](state, payload) {
        state.slideFullRight = payload
    },
    [SHOW_LOGIN](state, payload) {
        state.showLogin = payload
    },
    [LANDING_CONTENT](state, payload) {
        state.landingContent = payload
    },
    [AFTER_LOGOUT](state, payload) {
        state.afterLogout = payload
    },
    [TEXT_LOADING](state, payload) {
        state.textLoading = payload
    },
}

const actions = {
    login_button_transition({ commit }, payload) {
        commit(LOGIN_BUTTON_TRANSITION, payload)
    },
    submit_button_transition({ commit }, payload) {
        commit(SUBMIT_BUTTON_TRANSITION, payload)
    },
    login_form_transition({ commit }, payload) {
        commit(LOGIN_FORM_TRANSITION, payload)
    },
    successfully({ commit }, payload) {
        commit(SUCCESSFULL, payload)
    },
    after_loading({ commit }, payload) {
        commit(AFTER_LOADING, payload)
    },
    home({ commit }, payload) {
        commit(HOME, payload)
    },
    sidebar_menu({ commit }, payload) {
        commit(SIDEBAR_MENU, payload)
    },
    circle({ commit }, payload) {
        commit(CIRCLE, payload)
    },
    sidebar({ commit }, payload) {
        commit(SIDEBAR, payload)
    },
    home_circle({ commit }, payload) {
        commit(HOME_CIRCLE, payload)
    },
    login_circle({ commit }, payload) {
        commit(LOGIN_CIRCLE, payload)
    },
    slide_left({ commit }, payload) {
        commit(SLIDE_LEFT, payload)
    },
    show_logo({ commit }, payload) {
        commit(SHOW_LOGO, payload)
    },
    header({ commit }, payload) {
        commit(HEADER, payload)
    },
    width_increase({ commit }, payload) {
        commit(WIDTH_INCREASE, payload)
    },
    full_width({ commit }, payload) {
        commit(FULL_WIDTH, payload)
    },
    home_side_menu({ commit }, payload) {
        commit(HOME_SIDE_MENU, payload)
    },
    all_side_menu({ commit }, payload) {
        commit(ALL_SIDE_MENU, payload)
    },
    show_home({ commit }, payload) {
        commit(SHOW_HOME, payload)
    },
    home_menu_text({ commit }, payload) {
        commit(HOME_MENU_TEXT, payload)
    },
    show_home_content({ commit }, payload) {
        commit(SHOW_HOME_CONTENT, payload)
    },
    home_wrapper({ commit }, payload) {
        commit(HOME_WRAPPER, payload)
    },
    show_logo_text({ commit }, payload) {
        commit(SHOW_LOGO_TEXT, payload)
    },
    header_text({ commit }, payload) {
        commit(HEADER_TEXT, payload)
    },
    loading_text({ commit }, payload) {
        commit(LOADING_TEXT, payload)
    },

    slide_right({ commit }, payload) {
        commit(SLIDE_RIGHT, payload)
    },
    slide_full_right({ commit }, payload) {
        commit(SLIDE_FULL_RIGHT, payload)
    },
    show_login({ commit }, payload) {
        commit(SHOW_LOGIN, payload)
    },
    landing_content({ commit }, payload) {
        commit(LANDING_CONTENT, payload)
    },
    width_decrese({ commit }, payload) {
        commit(WIDTH_DECRESE, payload)
    },
    after_logout({ commit }, payload) {
        commit(AFTER_LOGOUT, payload)
    },
    text_loading({ commit }, payload) {
        commit(TEXT_LOADING, payload)
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}
