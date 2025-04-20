import { SOCIAL_FEEDS } from '~/constants/urls'

const state = () => ({
  socialFeeds: [],
  showAddFeedModal: false,
  editableSocialFeed: {
    open: false,
    data: {},
  },
  showRefundModal: false,
  refundAmount: 0.0,
  showSinglePost: false,
  showSingleImagePost: false,
  index: 0,
  singlePost: {},
  previousSinglePost: [],
  allGroups: [],
  allNames: [],
  showArchiveSystemSettings: false,
  archiveFeed: false,
  showTwitter: true,
})

const getters = {
  socialFeedLength(state) {
    return state.socialFeeds.length
  },
  showEditFeedModal(state) {
    return state.editableSocialFeed.open
  },
  editableFeedData(state) {
    return state.editableSocialFeed.data
  },
  openAddFeedModal(state) {
    return state.showAddFeedModal
  },
  getAllNames(state) {
    return state.allNames
  },
  getAllGroups(state) {
    return state.allGroups
  },
}

const mutations = {
  SET_SHOW_TWITTER(state, payload) {
    state.showTwitter = payload
  },
  SET_ARCHIVE_FEED(state, payload) {
    state.archiveFeed = payload
  },
  SET_SOCIAL_FEEDS(state, payload) {
    payload.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
    state.socialFeeds = payload
    state.socialFeeds.forEach((item, index) => {
      if (index === 0) {
        item.backgroundColor = true
      } else {
        item.backgroundColor = false
      }
    })
    console.log(state.socialFeeds, "social feeds")
    if (state.socialFeeds.length > 0) {
      this.commit('home/SET_CURRENT_SOCIAL_COMPONENT', {
        provider: state.socialFeeds[0].provider,
        username: state.socialFeeds[0].name,
        id: state.socialFeeds[0].id,
        selectedFeed: state.socialFeeds[0],
      })
      // this.dispatch('home/getAllSocialArticle', {
      //   id: state.socialFeeds[0].id,
      // })
    }
  },
  SHOW_ADD_FEED_MODAL(state, payload) {
    state.showAddFeedModal = payload
  },
  SHOW_SOCIAL_EDIT_FEED_MODAL(state, payload) {
    state.editableSocialFeed = payload
  },
  SET_REFUND_AMOUNT(state, payload) {
    state.refundAmount = payload
  },
  SHOW_REFUND_MODAL(state, payload) {
    state.showRefundModal = payload
  },
  SINGLE_POST_SHOW(state, payload) {
    state.showSinglePost = payload
  },
  SINGLE_POST(state, payload) {
    state.singlePost = payload
  },
  PREVIOUS_SINGLE_POST(state, payload) {
    state.previousSinglePost.unshift(payload)
  },
  RESET_PREVIOUS_SINGLE_POST(state) {
    state.previousSinglePost = []
  },
  BACK_TO_PREVIOUS_POST(state, payload) {
    state.singlePost = payload
    state.previousSinglePost.splice(0, 1)
  },
  SINGLE_IMAGE_POST_SHOW(state, payload) {
    state.showSingleImagePost = payload
  },
  SINGLE_INDEX(state, payload) {
    state.index = payload
  },
  SET_Selected_Groups(state, payload) {
    state.selectedGroups = payload
  },
  SET_Selected_Names(state, payload) {
    state.selectedNames = payload
  },
  SET_ALL_GROUPS(state, payload) {
    state.allGroups = payload
    //   [
    //   ...new Map(payload.map((item) => [item.value, item])).values(),
    // ]
  },
  SET_ALL_NAMES(state, payload) {
    state.allNames = payload
  },
  SET_SHOW_ARCHIVE_SYSYTEM_SETTINGS(state, payload) {
    state.showArchiveSystemSettings = payload
  },
  SET_ALL_FEEDS_VALUES(state, payload) {
    this.commit('SET_ALL_FEEDS_VALUE', payload)
  }
}

const actions = {
  fatchSocialFeeds({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(SOCIAL_FEEDS)
        .then((response) => {
          commit('SET_SOCIAL_FEEDS', response.data)
          resolve(response)
          if (response.success) {
            const allNames = []
            let allGroups = []
            response.data.forEach((item) => {
              if (item.group) {
                allGroups.push({
                  id: item.group.id,
                  text: item.group.groupName,
                  value: item.group.id,
                  mediaValue: true
                })
              }
              allNames.push({
                id: item.id,
                text: item.name,
                value: item.id,
                mediaValue: true
              })
            })
            allGroups = [
              ...new Map(allGroups.map((item) => [item.value, item])).values(),
            ]
            commit('SET_ALL_GROUPS', allGroups)
            commit('SET_ALL_NAMES', allNames)
            commit('SET_ALL_FEEDS_VALUES', { allGroups, allNames })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  deleteSocialFeed({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$delete(SOCIAL_FEEDS, {
          data: {
            id,
          },
        })
        .then((response) => {
          if (response.success) {
            this.dispatch('socialFeed/fatchSocialFeeds')
            resolve(response)
          } else {
            reject(response)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  singlePostShow({ commit }, payload) {
    commit('SINGLE_POST_SHOW', payload.show)
    if (payload.previousSinglePost) {
      commit('PREVIOUS_SINGLE_POST', payload.previousSinglePost)
    }
    commit('SINGLE_POST', payload.singleItem)

  },
  singlePostClose({ commit }, payload) {
    commit('SINGLE_POST_SHOW', payload)
  },
  singleImagePostShow({ commit }, payload) {
    commit('SINGLE_IMAGE_POST_SHOW', payload.show)
    if (payload.previousSinglePost) {
      commit('PREVIOUS_SINGLE_POST', payload.previousSinglePost)
    }
    commit('SINGLE_POST', payload.singleItem)
    commit('SINGLE_INDEX', payload.index)
  },
  singleImagePostClose({ commit }, payload) {
    commit('SINGLE_IMAGE_POST_SHOW', payload)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
