import { SOCIALS } from '~/constants/urls'

const state = () => ({
  selectedSources: 'Source',
  selectedGroups: 'Group',
  selectedNames: 'Name',
  filter: false,
  isFiltering: false,
  userAndInfo: [],
  showBulkDownloadSideBar: false,
  downloadLoader: false
})

const getters = {
  getFilter(state) {
    return state.filter
  },
  getArchiveFeeds(state) {
    return state.userAndInfo
  },
  getCheckFiltering(state) {
    return state.isFiltering
  }
}

const mutations = {
  SET_Selected_Sources(state, payload) {
    state.selectedSources = payload
  },
  SET_Selected_Groups(state, payload) {
    state.selectedGroups = payload
  },
  SET_Selected_Names(state, payload) {
    state.selectedNames = payload
  },
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_ARCHIVE_FEEDS(state, payload) {
    state.userAndInfo = payload
  },
  SET_IS_FILTERING(state, payload) {
    state.isFiltering = payload
  },
  SET_BULK_DOWNLOAD_SIDEBAR(state, payload) {
    state.showBulkDownloadSideBar = payload
  },
  SET_DOWNLOAD_LOADER(state, payload) {
    state.downloadLoader = payload
  },
}

const actions = {
  setFilter({ commit }, payload) {
    commit('SET_FILTER', payload)
  },
  getAllSocialInfo({ commit, getters }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(SOCIALS, {
          mode: 'no-cors',
        })
        .then(
          (response) => {
            if (response.success) {
              resolve(response)
              response.data.forEach((item) => {
                item.selectable = false
              })
              commit('SET_ARCHIVE_FEEDS', response.data)
            }
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async filterUserAndInfo({ commit, state }, payload) {
    this.$toast.clear()
    try {
      const response = await this.$axios.get(SOCIALS, {
        params: {
          provider:
            state.selectedSources === 'Source' ? '' : state.selectedSources,
          groupId: state.selectedGroups === 'Group' ? '' : state.selectedGroups,
          feedId: state.selectedNames === 'Name' ? '' : state.selectedNames,
          startDate: payload.start === '' ? '' : payload.start,
          endDate:
            payload.end === '' || payload.start === payload.end
              ? ''
              : payload.end,
        },
      })
      if (response.data.success === true) {
        commit('SET_IS_FILTERING', response.data.success)
        this.$toast.clear()
        commit('SET_ARCHIVE_FEEDS', response.data.data)
        this.$toast.success(response.data.message, {
          className: ['toasted-bg-archive'],
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
