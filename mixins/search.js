import { mapState, mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { format, parseISO, startOfYear, getYear } from 'date-fns'
import { SAVE_USER_SEARCH, SAVED_SEARCH } from '~/constants/urls'
const pastMonthPlaceholder = (start, end, dateFormat) => {
  return (
    format(parseISO(start), dateFormat) +
    ' - ' +
    format(parseISO(end), dateFormat)
  )
}
export const searchFeedContextMixin = {
  data() {
    return {
      searchAbleProperties: {
        searchText: '',
        containText: '',
        ignoreText: '',
        includeComments: true,
        includeReplies: true,
        includeDirectMessages: true,
        provider: 'all',
        groupId: 'all',
        pastMonths: 'All Dates',
        pastMonthValue: '',
        startDate: '',
        endDate: '',
      },
      hiddenContainText: '',
      hiddenIgnoreText: '',
      allSocialContext: [],
      searchProcess: false,
      savedSearch: 'Saved Searches',
      showAnotherSearchField: false,
      showVCelander: false,
      showToggleSearch: false,
      smoothMove: false,
      allFeeds: 'All Feeds'
    }
  },
  computed: {
    ...mapState([
      'pastMonths',
      'savedSearches',
      'socialProvidersInitial',
      'betaVersion',
    ]),
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
    ...mapState('home', ['getOldJoiningDateTime']),
    years() {
      const years = []
      for (
        let i = new Date().getFullYear();
        i >= getYear(parseISO(this.getOldJoiningDateTime));
        i--
      ) {
        years.push(i)
      }
      return years
    },
  },
  created() {
    this.$nuxt.$on('hideVCalender', () => {
      this.vCalenderHide()
    })
  },
  methods: {
    vCalenderShow() {
      this.showVCelander = true
    },
    vCalenderHide() {
      this.showVCelander = false
    },
    pastMonthDateRageEvent(daterange) {
      this.searchAbleProperties.pastMonths = pastMonthPlaceholder(
        daterange.start,
        daterange.end,
        this.globalDateformat
      )
      this.searchAbleProperties.startDate = daterange.start
      this.searchAbleProperties.endDate = daterange.end
      this.searchAbleProperties.pastMonthValue = ''
    },
    pastMonthsValue(pastmonth) {
      this.searchAbleProperties.pastMonths = pastmonth.text
      this.searchAbleProperties.pastMonthValue = pastmonth.value
      this.searchAbleProperties.startDate = ''
      this.searchAbleProperties.endDate = ''
    },
    showAnotherField() {
      this.showAnotherSearchField = true
      this.searchAbleProperties.containText = this.hiddenContainText
      this.searchAbleProperties.ignoreText = this.hiddenIgnoreText
    },
    hideAnotherField() {
      this.showAnotherSearchField = false
      this.hiddenContainText = this.searchAbleProperties.containText
      this.hiddenIgnoreText = this.searchAbleProperties.ignoreText
    },
    setAllFeedsValue() {
      this.searchAbleProperties.provider = 'all'
      this.searchAbleProperties.groupId = 'all'
    },
    selectedSource(value) {
      this.searchAbleProperties.provider = value
    },
    selectedGroup(value) {
      this.searchAbleProperties.groupId = value
    },
    async searchContext() {
      this.$toast.clear()
      if (
        !this.searchAbleProperties.searchText &&
        !this.searchAbleProperties.containText &&
        !this.searchAbleProperties.ignoreText
      ) {
        this.$toast.error('Enter Text Below', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.searchTextInput.focus()
        return false
      }
      if (
        this.searchAbleProperties.searchText ||
        this.searchAbleProperties.containText ||
        this.searchAbleProperties.ignoreText
      ) {
        if (this.searchProcess) {
          return this.$toast.success('Search is processing!', {
            className: ['toasted-bg-archive'],
          })
        }
        if (this.searchAbleProperties.pastMonths === 'All Dates') {
          const startDate = startOfYear(new Date(Math.min(...this.years), 8, 2, 11, 55));
          const endDate = new Date();
          const start = format(startDate, 'yyyy-MM-dd')
          const end = format(endDate, 'yyyy-MM-dd')
          this.pastMonthDateRageEvent({
            start,
            end
          })
          this.$nuxt.$emit('selectAllDateTime')
        }
        try {
          this.searchProcess = true
          const res = await this.$axios.$get(SAVED_SEARCH, {
            params: {
              ...this.searchAbleProperties,
              pastMonths: this.searchAbleProperties.pastMonthValue,
            },
          })
          if (res.success) {
            this.$toast.clear()
            this.allSocialContext = res.data
            this.allSocialContext.forEach((item) => {
              item.Selected = false
              item.Viewers = [
                {
                  Name: 'Elon Musk',
                  UserName: '@WholMarsBlog',
                  Time: '8h',
                  Status: 'Tesla FSD price rising to $12k on Jan 17',
                  CommentCount: '55',
                  RetweetCount: '102',
                  ReactCount: '1.2K',
                },
                {
                  Name: 'Iqbal Sunny',
                  UserName: '@IkbalSunny',
                  Time: '6h',
                  Status:
                    'Monthly subscription price will rise when FSD goes to wide release',
                  CommentCount: '55',
                  RetweetCount: '102',
                  ReactCount: '1.2K',
                },
                {
                  Name: 'Sandy Marry',
                  UserName: '@SandyMarriana',
                  Time: '10h',
                  Status: 'Monthly sub price staying the same?',
                  CommentCount: '55',
                  RetweetCount: '102',
                  ReactCount: '1.2K',
                },
                {
                  Name: 'Alexa Jolly',
                  UserName: '@Jolly Alexana',
                  Time: '16h',
                  Status: 'Tesla FSD price rising to $12k on Jan 17',
                  CommentCount: '55',
                  RetweetCount: '102',
                  ReactCount: '1.2K',
                },
                {
                  Name: 'Ariana Granda',
                  UserName: '@ArianaGrand',
                  Time: '3h',
                  Status: 'Monthly sub price staying the same?',
                  CommentCount: '5500',
                  RetweetCount: '1088',
                  ReactCount: '10.2K',
                },
              ]
            })
            if (this.allSocialContext.length > 0) {
              this.$toast.clear()
              this.$toast.success(res.message, {
                className: ['toasted-bg-archive'],
              })
            }
            else {
              this.$toast.error('No Results Found', {
                className: ['toasted-bg-alert'],
              })
            }
            this.$nuxt.$emit('searchResults', {
              results: res.data,
              searchText: this.searchAbleProperties.searchText,
            })
            this.$store.dispatch('mobile/header/closeMobileSearchBar')
          }
          else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.searchProcess = false
        }
      }
    },
    selectedFlagged(selected) {
      // this.allSocialContext.forEach(selected, index)
      for (let i = 0; i < this.allSocialContext.length; i++) {
        if (this.allSocialContext[i].id === selected) {
          this.allSocialContext[i].Selected = !this.allSocialContext[i].Selected
        } else {
          this.allSocialContext[i].Selected = false
        }
        this.$set(this.allSocialContext, i, this.allSocialContext[i])
      }
    },
    async selectedSavedSearch($event) {
      this.$toast.clear()
      const id = $event
      this.$store.commit('SET_DATA_SEARCH', false)
      try {
        this.searchProcess = true
        this.$toast.clear()
        const res = await this.$axios.$get(`${SAVE_USER_SEARCH}?id=${id}`)
        if (res.success) {
          this.$toast.clear()
          this.$store.commit('SET_DATA_SEARCH', true)
          this.hiddenContainText = res.data.containText
          this.hiddenIgnoreText = res.data.ignoreText
          this.searchAbleProperties.searchText = res.data.searchText
          this.searchAbleProperties.containText = res.data.containText
          this.searchAbleProperties.ignoreText = res.data.ignoreText
          this.searchAbleProperties.includeComments = res.data.includeComments
          this.searchAbleProperties.includeReplies = res.data.includeReplies
          this.searchAbleProperties.includeDirectMessages =
            res.data.includeDirectMessages
          this.searchAbleProperties.provider = res.data.provider
          this.searchAbleProperties.groupId = res.data.groupId
          this.searchAbleProperties.startDate = res.data.startDate
          this.searchAbleProperties.endDate = res.data.endDate
          if (res.data.startDate && res.data.endDate) {
            this.searchAbleProperties.pastMonths = pastMonthPlaceholder(
              res.data.startDate,
              res.data.endDate,
              this.globalDateformat
            )
            this.searchAbleProperties.pastMonthValue = ''
            this.$nuxt.$emit('dateRange', {
              startDate: res.data.startDate,
              endDate: res.data.endDate,
            })
          } else {
            this.searchAbleProperties.pastMonthValue = res.data.pastMonths
            this.searchAbleProperties.pastMonths = 'All'
          }
          if (
            this.searchAbleProperties.containText ||
            this.searchAbleProperties.ignoreText
          ) {
            // this.showAnotherSearchField = true
            // this.showToggleSearch = true
            this.addMoreSearchField()
          } else {
            // this.showAnotherSearchField = false
            // this.showToggleSearch = false
            this.removeMoreSearchField()
          }
          this.getSelectedSavedSearch(id)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.searchProcess = false
      }
    },
    async selectedMobileSavedSearch($event) {
      const id = $event
      this.$refs.allFeedsMenu.checkedAll('all_feeds')
      this.$store.commit('SET_DATA_SEARCH', false)
      try {
        // this.searchProcess = true
        const res = await this.$axios.$get(`${SAVE_USER_SEARCH}?id=${id}`)
        if (res.success) {
          this.$store.commit('SET_DATA_SEARCH', true)
          this.hiddenContainText = res.data.containText
          this.hiddenIgnoreText = res.data.ignoreText
          this.searchAbleProperties.searchText = res.data.searchText
          this.searchAbleProperties.containText = res.data.containText
          this.searchAbleProperties.ignoreText = res.data.ignoreText
          this.searchAbleProperties.includeComments = res.data.includeComments
          this.searchAbleProperties.includeReplies = res.data.includeReplies
          this.searchAbleProperties.includeDirectMessages =
            res.data.includeDirectMessages
          this.searchAbleProperties.provider = res.data.provider
          this.searchAbleProperties.groupId = res.data.groupId
          this.searchAbleProperties.startDate = res.data.startDate
          this.searchAbleProperties.endDate = res.data.endDate
          if (res.data.startDate && res.data.endDate) {
            this.searchAbleProperties.pastMonths = pastMonthPlaceholder(
              res.data.startDate,
              res.data.endDate,
              this.globalDateformat
            )
            this.searchAbleProperties.pastMonthValue = ''
            this.$nuxt.$emit('dateRange', {
              startDate: res.data.startDate,
              endDate: res.data.endDate,
            })
          } else {
            this.searchAbleProperties.pastMonthValue = res.data.pastMonths
            this.searchAbleProperties.pastMonths = 'All'
          }
          if (
            this.searchAbleProperties.containText ||
            this.searchAbleProperties.ignoreText
          ) {
            // this.showAnotherSearchField = true
            // this.showToggleSearch = true
            this.addMoreSearchField()
          } else {
            // this.showAnotherSearchField = false
            // this.showToggleSearch = false
            this.removeMoreSearchField()
          }
        }
      } catch (error) {
        console.log(error)
      }
      // finally {
      //   this.searchProcess = false
      // }
    },
    async getSelectedSavedSearch(id) {
      this.$toast.clear()
      try {
        this.searchProcess = true
        const res = await this.$axios.$get(`${SAVED_SEARCH}?id=${id}`)
        if (res.success) {
          this.$toast.clear()
          this.allSocialContext = res.data
          if (this.allSocialContext.length > 0) {
            this.$toast.clear()
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
          }
          else {
            this.$toast.clear()
            this.$toast.error('No Results Found', {
              className: ['toasted-bg-alert'],
            })
          }
          this.$nuxt.$emit('searchResults', {
            results: res.data,
            searchText: this.searchAbleProperties.searchText,
          })
          this.$store.dispatch('mobile/header/closeMobileSearchBar')
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.searchProcess = false
      }
    },
    clearSearch() {
      this.$nuxt.$emit('clearDatePicker')
      this.searchAbleProperties = {
        searchText: '',
        containText: '',
        ignoreText: '',
        includeComments: true,
        includeReplies: true,
        includeDirectMessages: true,
        provider: 'all',
        groupId: 'all',
        pastMonths: 'All Dates',
        pastMonthValue: '',
        startDate: '',
        endDate: '',
      }
      this.allSocialContext = []
      this.hiddenContainText = ''
      this.hiddenIgnoreText = ''
      this.showToggleSearch = false
      this.showAnotherSearchField = false
      this.$refs.allFeedsMenu.checkedAll('all_feeds')
      this.$store.commit('SET_DATA_SEARCH', false)
      setTimeout(() => {
        this.smoothMove = false
      }, 1000)
      this.savedSearch = 'Saved Searches'
      this.$v.$reset()
    },
  },
}

export const saveSearchCreatedMixin = {
  data() {
    return {
      saveSearchProperties: {
        name: '',
        searchText: '',
        containText: '',
        ignoreText: '',
        includeComments: true,
        includeReplies: true,
        includeDirectMessages: true,
        provider: 'all',
        groupId: 'all',
        pastMonths: 'All Dates',
        pastMonthValue: '',
        startDate: '',
        endDate: '',
      },
      oldNameText: '',
      oldSearchText: '',
      oldContainText: '',
      oldIgnoreText: '',
      OldIncludeComments: true,
      OldIncludeReplies: true,
      OldIncludeDirectMessages: true,
      Oldprovider: 'all',
      OldGroupId: 'all',
      OldpastMonths: 'All Dates',
      editSaveSearchId: 'Saved Searches',
      userSavedSearchEdit: false,
      showVCelander: false,
      addProcess: false,
      updateProcess: false,
      showAnotherSearchField: false,
      showSaveButton: false,
      showAddNewButton: true,
      deleteProcess: false,
      time1: '',
      time2: '',
      activeComponent: 'AddNewButton',
      allFeeds: 'All Feeds',
      selectedItem: false,
    }
  },
  computed: {
    ...mapState(['pastMonths', 'socialProvidersInitial']),
    ...mapState('system', {
      globalDateformat: 'formatDate',
    }),
  },
  created() {
    this.$nuxt.$on('hideVCalender', () => {
      this.vCalenderHide()
    })
  },
  watch: {
    'saveSearchProperties.name': {
      handler(data) {
        if (
          data.length > 0 &&
          data !== this.oldNameText &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.searchText': {
      handler(data) {
        if (
          data.length > 0 &&
          data !== this.oldSearchText &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.containText': {
      handler(data) {
        if (
          data.length > 0 &&
          data !== this.oldContainText &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.ignoreText': {
      handler(data) {
        if (
          data.length > 0 &&
          data !== this.oldIgnoreText &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.includeComments': {
      handler(data) {
        if (data !== this.OldIncludeComments && this.userSavedSearchEdit) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.includeReplies': {
      handler(data) {
        if (data !== this.OldIncludeReplies && this.userSavedSearchEdit) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.includeDirectMessages': {
      handler(data) {
        if (
          data !== this.OldIncludeDirectMessages &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.provider': {
      handler(data) {
        if (
          data.length > 0 &&
          data !== this.Oldprovider &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.groupId': {
      handler(data) {
        if (
          data.length > 0 &&
          data !== this.OldGroupId &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
    'saveSearchProperties.pastMonths': {
      handler(data) {
        if (
          data.length > 0 &&
          data !== this.OldpastMonths &&
          this.userSavedSearchEdit
        ) {
          clearTimeout(this.time2)
          if (this.showAddNewButton) {
            this.showAddNewButton = false
          }
          if (!this.showSaveButton) {
            this.time1 = setTimeout(() => {
              this.showAddNewButton = false
              this.showSaveButton = true
            }, 500)
          }
        }
      },
    },
  },
  methods: {
    ...mapActions({
      storeSearch: 'storeSearch',
      updateSavedSearch: 'updateSavedSearch',
      removeSavedSearch: 'removeSavedSearch',
    }),
    setSavedAllFeedsValue() {
      this.saveSearchProperties.provider = 'all'
      this.saveSearchProperties.groupId = 'all'
    },
    selectedSavedSource(value) {
      this.saveSearchProperties.provider = value
    },
    selectedSavedGroup(value) {
      this.saveSearchProperties.groupId = value
    },
    vCalenderShow() {
      this.showVCelander = true
    },
    vCalenderHide() {
      this.showVCelander = false
    },
    pastMonthDateRageEvent(daterange) {
      this.saveSearchProperties.pastMonths = pastMonthPlaceholder(
        daterange.start,
        daterange.end,
        this.globalDateformat
      )
      this.saveSearchProperties.startDate = daterange.start
      this.saveSearchProperties.endDate = daterange.end
      this.saveSearchProperties.pastMonthValue = ''
    },
    pastMonthsValue(pastmonth) {
      this.saveSearchProperties.pastMonths = pastmonth.text
      this.saveSearchProperties.pastMonthValue = pastmonth.value
      this.saveSearchProperties.startDate = ''
      this.saveSearchProperties.endDate = ''
    },
    oneOfThemIsRequired() {
      if (this.saveSearchProperties.searchText.length) {
        return false
      } else {
        return true
      }
    },
    async addUserSavedSearch() {
      this.$v.$touch()
      this.$toast.clear()
      if (this.saveSearchProperties.name === '') {
        this.$toast.error('Enter Text Below', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.userNameInput.focus()
        return false
      } else if (this.saveSearchProperties.name.length > 40) {
        this.$toast.error('Maximum character is 40', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.userNameInput.focus()
        return false
      }
      if (this.oneOfThemIsRequired()) {
        this.$toast.error('May Contain Field is Required', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.mayContent.focus()
        this.oneofThem = true
        return false
      } else {
        this.oneofThem = false
      }

      if (this.saveSearchProperties.pastMonths === 'All Dates') {
        this.$toast.error('The All Dates field is required', {
          className: ['toasted-bg-alert'],
        })
        return false
      }

      if (!this.$v.$invalid) {
        this.addProcess = true
        try {
          const res = await this.$axios.$post(SAVE_USER_SEARCH, {
            ...this.saveSearchProperties,
            pastMonths: this.saveSearchProperties.pastMonthValue,
          })
          if (res.success) {
            this.$toast.success(res.message, {
              className: ['toasted-bg-archive'],
            })
            this.storeSearch({
              id: res.data.id,
              text: res.data.name,
              value: res.data.id,
            })
            this.clearOldData()
            this.$store.dispatch('mobile/header/closeMobileSaveSearch')
          } else {
            this.$toast.error(res.message, {
              className: ['toasted-bg-alert'],
            })
          }
          this.addProcess = false
        } catch (error) {
          console.log(error)
          this.addProcess = false
        }
      }
    },
    async editSaveUserSearch(id) {
      try {
        this.selectedItem = true
        this.$refs.allFeedsMenu.checkedAll('all_feeds')
        this.$store.commit('SET_EDIT_FEEDS', false)
        const res = await this.$axios.$get(`${SAVE_USER_SEARCH}?id=${id}`)
        if (res.success) {
          this.userSavedSearchEdit = true
          this.saveSearchProperties = res.data
          this.$store.commit('SET_EDIT_FEEDS', true)
          this.oldNameText = this.saveSearchProperties.name
          this.oldSearchText = this.saveSearchProperties.searchText
          this.oldContainText = this.saveSearchProperties.containText
          this.oldIgnoreText = this.saveSearchProperties.ignoreText
          this.OldIncludeComments = this.saveSearchProperties.includeComments
          this.OldIncludeDirectMessages =
            this.saveSearchProperties.includeDirectMessages
          this.OldIncludeReplies = this.saveSearchProperties.includeReplies
          this.Oldprovider = this.saveSearchProperties.provider
          this.OldGroupId = this.saveSearchProperties.groupId
          this.showSaveButton = false
          setTimeout(() => {
            this.showAddNewButton = true
          }, 500)
          if (res.data.startDate && res.data.endDate) {
            this.saveSearchProperties.pastMonthValue = ''
            this.saveSearchProperties.pastMonths = pastMonthPlaceholder(
              res.data.startDate,
              res.data.endDate,
              this.globalDateformat
            )
            this.OldpastMonths = this.saveSearchProperties.pastMonths
          } else if (res.data.pastMonths === -1) {
            this.saveSearchProperties.pastMonthValue = res.data.pastMonths
            this.saveSearchProperties.pastMonths = 'All'
            this.OldpastMonths = this.saveSearchProperties.pastMonths
          }

          this.showAnotherSearchField = !!(
            res.data.containText || res.data.ignoreText
          )
        }
      } catch (error) {
        console.log(error)
      } finally {
        // this.$store.commit('SET_EDIT_FEEDS', false)
        this.selectedItem = false
      }
    },
    async updateUserSavedSearch() {
      this.$toast.clear()
      if (this.saveSearchProperties.name === '') {
        this.$toast.error('Enter Text Below', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.userNameInput.focus()
        return false
      } else if (this.saveSearchProperties.name.length > 40) {
        this.$toast.error('Maximum character is 40', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.userNameInput.focus()
        return false
      }
      if (this.oneOfThemIsRequired()) {
        this.$toast.error('May Contain Field is Required', {
          className: ['toasted-bg-alert'],
        })
        this.$refs.mayContent.focus()
        this.oneofThem = true
        return false
      } else {
        this.oneofThem = false
      }

      if (this.saveSearchProperties.pastMonths === 'All Dates') {
        this.$toast.error('The All Dates field is required', {
          className: ['toasted-bg-alert'],
        })
        return false
      }

      try {
        this.updateProcess = true
        const res = await this.$axios.$put(SAVE_USER_SEARCH, {
          ...this.saveSearchProperties,
          pastMonths: this.saveSearchProperties.pastMonthValue,
        })
        if (res.success) {
          this.$toast.success(res.message, {
            className: ['toasted-bg-archive'],
          })
          this.updateSavedSearch({
            id: res.data.id,
            text: res.data.name,
            value: res.data.id,
          })
          this.showSaveButton = false
          setTimeout(() => {
            this.showAddNewButton = true
          }, 500)
          this.$store.dispatch('mobile/header/closeMobileSaveSearch')
        } else {
          this.$toast.error(res.message, {
            className: ['toasted-bg-alert'],
          })
        }
        this.updateProcess = false
      } catch (error) {
        console.log(error)
        this.updateProcess = false
      }
    },
    clearOldData() {
      this.$nuxt.$emit('clearDatePicker')

      this.saveSearchProperties.id = ''
      this.saveSearchProperties.name = ''
      this.saveSearchProperties.searchText = ''
      this.saveSearchProperties.containText = ''
      this.saveSearchProperties.ignoreText = ''
      this.saveSearchProperties.includeComments = true
      this.saveSearchProperties.includeReplies = true
      this.saveSearchProperties.includeDirectMessages = true
      this.saveSearchProperties.provider = 'all'
      this.saveSearchProperties.groupId = 'all'
      this.saveSearchProperties.pastMonths = 'All Dates'
      this.saveSearchProperties.pastMonthValue = ''
      this.saveSearchProperties.id = ''
      this.editSaveSearchId = 'Saved Searches'
      this.showSaveButton = false
      setTimeout(() => {
        this.showAddNewButton = true
      }, 500)
      this.userSavedSearchEdit = false
      this.$store.commit('SET_EDIT_FEEDS', false)
      this.$refs.userNameInput.focus()
      this.$v.$reset()
    },
  },
}