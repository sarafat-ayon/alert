import {
  LATEST_ARCHIVE,
  SOCIAL_ARTICLE,
  SOCIAL_ARTICLE_LOAD_MORE,
  ALL_MESSAGE_PERSONS,
  SINGLE_CONVERTIONS,
  GET_MORE_MESSAGES,
  YOUTUBE_PLAYLIST,
  YOUTUBE_PLAYLIST_ITEM,
  YOUTUBE_PLAYLIST_ITEM_MORE,
  SOCIAL_EARLIEST_DATE,
} from '~/constants/urls'

const state = () => ({
  latest: {
    th: [{ name: 'Username' }, { name: 'Source' }, { name: 'Download' }],
    tbody: [],
  },
  websiteLog: {
    th: [{ name: 'Date' }, { name: 'Page Name' }, { name: 'Type' }],
    tbody: [
      {
        id: 1,
        date: '4/13/2022',
        pageName: 'Blog',
        type: 'Add',
        expand: {
          link: 'https://greenstaradvisor.com/blog/04132022',
        },
        selected: false,
      },
      {
        id: 2,
        date: '4/13/2022',
        pageName: 'Contact',
        type: 'Change',
        selected: false,
      },
      {
        id: 3,
        date: '3/26/2021',
        pageName: 'Blog',
        type: 'Add',
        expand: {
          link: 'https://greenstaradvisor.com/blog/04132022',
          flag: 'Promissory Statement',
          title: '"dolor sit amet" in lexicon',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        },
        selected: false,
      },
      {
        id: 4,
        date: '3/26/2021',
        pageName: 'Home',
        type: 'Change',
        selected: false,
      },
    ],
  },
  articles: [],
  newArticles: [],
  loadArticles: true,
  loadMoreArticlesSkelaton: false,
  loadMoreArticles: true,
  showMobileMenu: false,
  currentHeader: 'RealTimeFeed',
  currentMessage: 'AllMessagePerson',
  currentSocialComponent: {},
  bodyHeight: 0,
  bodyMobileHeight: 0,
  detailsExpand: false,
  showComp: false,
  words: {},
  twitterComment: [],
  previousTwitterComment: [],
  allMessagePersons: null,
  singleCovertions: null,
  pageId: '',
  participant: '',
  conversationOwner: null,
  conversationUser: null,
  newLoadMessages: [1],
  showMessageskeleton: false,
  showPersonSkeleton: true,
  showMoreMessageSkeleton: false,
  messageCount: 0,
  person: null,
  showOptionsOverAll: false,
  searchText: '',
  // Email states
  allExpanded: false,
  currentTab: 'All',
  currentYoutubeContent: 'Summary',
  emailDynamicComp: 'EmailContent',
  singleMessage: [],
  tempSingleMessage: [],
  index: 0,
  currentIndex: 0,
  expandFullImage: false,
  messageId: 0,
  attachment: null,
  selectedMessage: null,
  selectedFeed: null,
  homeCurrentComp: '',
  feedsDropdown: false,
  youtubeComment: [],
  youtubeTranscript: [],
  Transcripts: [],
  youtubePlayLists: null,
  youtubePlayListItems: null,
  selectedPlayList: false,
  tempArticles: [],
  getOldJoiningDateTime: ''
})

const getters = {
  getLatestData(state) {
    return state.latest.tbody
  },
  getSocialArticle(state) {
    return state.articles
  },
  getNewArticles(state) {
    return state.newArticles
  },
  getCurrentArticles(state) {
    return state.articles[state.currentSocialComponent.id]
  },
  showMenu(state) {
    if (state.showMobileMenu) {
      document.querySelectorAll('video').forEach((vid) => vid.pause())
    }
    return state.showMobileMenu
  },
  currentHead(state) {
    return state.currentHeader
  },
  currentMess(state) {
    return state.currentMessage
  },
  currentComp(state) {
    return state.currentSocialComponent.provider
  },
  conversations(state) {
    const userId = state.conversationUser && state.conversationUser.uid
    if (state.singleCovertions) {
      return state.singleCovertions.messages.reduce(
        (p, c) => {
          if (typeof p.fromUid === 'undefined' || p.fromUid !== c.fromUid) {
            p.fromUid = c.fromUid
            // p.groups.push([])
            p.groups.push({
              user: c.fromUid === userId,
              date: c.createdAt,
              messages: [],
            })
          }
          // p.groups[p.groups.length - 1].push(c);
          p.groups[p.groups.length - 1].messages.push(c)
          return p
        },
        { groups: [] }
      ).groups
    } else {
      return []
    }
  },
  allEmails(state) {
    if (state.currentSocialComponent.provider === 'Google') {
      const tempObj = JSON.parse(JSON.stringify(state.articles))
      if (state.currentTab === 'Incoming') {
        tempObj.items.forEach((item) => {
          if (state.selectedMessage && item.id === state.selectedMessage.id) {
            item.individualSelect = true
          } else {
            item.individualSelect = false
          }
        })

        const filteredArr = tempObj.items.reduce((acc, current) => {
          const x = acc.find(
            (item) =>
              item.threadId === current.threadId ||
              (item.historyId === current.historyId &&
                item.labels.includes('SENT')) ||
              item.threadId === current.threadId ||
              item.historyId === current.historyId
          )
          if (!x) {
            return acc.concat([current])
          } else {
            acc.forEach((item, index) => {
              if (
                (item.threadId === current.threadId ||
                  item.historyId === current.historyId) &&
                item.labels.includes('SENT')
              ) {
                acc[index] = current
              }
            })
            return acc
          }
        }, [])

        tempObj.items = filteredArr

        return tempObj
      } else if (state.currentTab === 'Outgoing') {
        tempObj.items.forEach((item) => {
          if (state.selectedMessage && item.id === state.selectedMessage.id) {
            item.individualSelect = true
          } else {
            item.individualSelect = false
          }
        })

        const filteredArr = tempObj.items.reduce((acc, current) => {
          const x = acc.find(
            (item) =>
              item.threadId === current.threadId ||
              item.historyId === current.historyId
          )
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, [])

        tempObj.items = filteredArr

        return tempObj
      } else {
        const tempObj = JSON.parse(JSON.stringify(state.articles))
        tempObj.items.forEach((item) => {
          if (state.selectedMessage && item.id === state.selectedMessage.id) {
            item.individualSelect = true
          } else {
            item.individualSelect = false
          }
        })
        const filteredArr = tempObj.items.reduce((acc, current) => {
          const x = acc.find(
            (item) =>
              item.threadId === current.threadId ||
              (item.historyId === current.historyId &&
                item.labels.includes('SENT')) ||
              item.threadId === current.threadId ||
              item.historyId === current.historyId
          )
          if (!x) {
            return acc.concat([current])
          } else {
            acc.forEach((item, index) => {
              if (
                (item.threadId === current.threadId ||
                  item.historyId === current.historyId) &&
                item.labels.includes('SENT')
              ) {
                acc[index] = current
              }
            })
            return acc
          }
        }, [])

        tempObj.items = filteredArr

        return tempObj
      }
    } else {
      const tempObj = JSON.parse(JSON.stringify(state.articles))
      if (state.currentTab === 'Incoming') {
        tempObj.items.forEach((item) => {
          if (state.selectedMessage && item.id === state.selectedMessage.id) {
            item.individualSelect = true
          } else {
            item.individualSelect = false
          }
        })

        const filteredArr = tempObj.items.reduce((acc, current) => {
          const x = acc.find(
            (item) =>
              (item.conversationId === current.conversationId &&
                item.isDeliveryReceiptRequested === null) ||
              item.conversationId === current.conversationId
          )
          if (!x) {
            return acc.concat([current])
          } else {
            acc.forEach((item, index) => {
              if (
                item.conversationId === current.conversationId &&
                item.isDeliveryReceiptRequested === null
              ) {
                acc[index] = current
              }
            })
            return acc
          }
        }, [])

        tempObj.items = filteredArr

        return tempObj
      } else if (state.currentTab === 'Outgoing') {
        tempObj.items.forEach((item) => {
          if (state.selectedMessage && item.id === state.selectedMessage.id) {
            item.individualSelect = true
          } else {
            item.individualSelect = false
          }
        })

        const filteredArr = tempObj.items.reduce((acc, current) => {
          const x = acc.find(
            (item) => item.conversationId === current.conversationId
          )
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, [])

        tempObj.items = filteredArr

        return tempObj
      } else {
        const tempObj = JSON.parse(JSON.stringify(state.articles))
        if (tempObj && tempObj.items) {
          tempObj.items.forEach((item) => {
            if (state.selectedMessage && item.id === state.selectedMessage.id) {
              item.individualSelect = true
            } else {
              item.individualSelect = false
            }
          })
        }
        let filteredArr
        if (tempObj && tempObj.items) {
          filteredArr = tempObj.items.reduce((acc, current) => {
            const x = acc.find(
              (item) =>
                (item.conversationId === current.conversationId &&
                  item.isDeliveryReceiptRequested === false) ||
                item.conversationId === current.conversationId
            )
            if (!x) {
              return acc.concat([current])
            } else {
              acc.forEach((item, index) => {
                if (
                  item.conversationId === current.conversationId &&
                  item.isDeliveryReceiptRequested === false
                ) {
                  acc[index] = current
                }
              })
              return acc
            }
          }, [])
        }

        tempObj.items = filteredArr

        return tempObj
      }
    }
  },
  singleMessageShow(state) {
    if (state.currentSocialComponent.provider === 'Google') {
      const tempObj = JSON.parse(JSON.stringify(state.articles))
      if (state.currentTab === 'Incoming') {
        let tempArray = tempObj.items

        tempArray = tempObj.items.filter(
          (element) =>
            state.selectedMessage && (element.historyId === state.selectedMessage.historyId ||
              element.threadId === state.selectedMessage.threadId)
        )
        tempObj.items = tempArray

        return tempObj.items.reverse()
      } else if (state.currentTab === 'Outgoing') {
        let tempArray = tempObj.items

        tempArray = tempObj.items.filter(
          (element) =>
            state.selectedMessage && (element.historyId === state.selectedMessage.historyId ||
              element.threadId === state.selectedMessage.threadId)
        )
        tempObj.items = tempArray

        return tempObj.items.reverse()
      } else {
        const tempObj = JSON.parse(JSON.stringify(state.articles))
        let tempArray = tempObj.items
        tempArray = tempObj.items.filter(
          (element) =>
            state.selectedMessage && (element.historyId === state.selectedMessage.historyId ||
              element.threadId === state.selectedMessage.threadId)
        )
        tempObj.items = tempArray

        return tempObj.items.reverse()
      }
    } else if (state.currentSocialComponent.provider === 'Microsoft') {
      const tempObj = JSON.parse(JSON.stringify(state.articles))
      if (state.currentTab === 'Incoming') {
        let tempArray = tempObj.items

        tempArray = tempObj.items.filter(
          (element) =>
            state.selectedMessage && element.conversationId === state.selectedMessage.conversationId
        )
        tempObj.items = tempArray

        return tempObj.items.reverse()
      } else if (state.currentTab === 'Outgoing') {
        let tempArray = tempObj.items

        tempArray = tempObj.items.filter(
          (element) =>
            state.selectedMessage && element.conversationId === state.selectedMessage.conversationId
        )
        tempObj.items = tempArray

        return tempObj.items.reverse()
      } else {
        const tempObj = JSON.parse(JSON.stringify(state.articles))
        let tempArray = tempObj.items
        tempArray = tempObj.items.filter(
          (element) =>
            state.selectedMessage && element.conversationId === state.selectedMessage.conversationId
        )
        tempObj.items = tempArray

        return tempObj.items.reverse()
      }
    }
  },
  selectedFeed(state) {
    return state.selectedFeed
  },
}

const mutations = {
  SET_SELECTED_PlayList(state, payload) {
    state.selectedPlayList = payload
  },
  SET_YOUTUBE_COMMENT(state, payload) {
    state.youtubeComment = payload
  },
  SET_YOUTUBE_TRANSCRIPT(state, payload) {
    const array = []
    state.youtubeTranscript = payload
    state.youtubeTranscript.forEach((item) => {
      const str = item.text.split('\n')
      let index = 0
      str.forEach((value) => {
        if (value) {
          // eslint-disable-next-line
          const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};'"\\|<>\/?~]/
          const numberSpecialCharacter = /[0-9\s]/
          const comaCharacter = /[:,.]/
          if (/^[a-zA-Z\s]+$/.test(value) || specialCharacter.test(value)) {
            array[index] = value
            index = index + 1
          } else if (
            numberSpecialCharacter.test(value) &&
            comaCharacter.test(value)
          ) {
            const str1 = value.split(',')[0].slice(0, -4).slice(-4)
            array[index] = str1
            index = index + 1
          } else {
            array[index] = value
            index = index + 1
          }
        }
      })
      const tempArray = []
      while (array.length > 0) {
        tempArray.push(array.splice(0, 2))
      }
      state.Transcripts = tempArray
    })
  },
  SET_YOUTUBE_PLAYLIST(state, payload) {
    state.youtubePlayLists = payload
  },
  SET_YOUTUBE_PLAYLIST_ITEMS(state, payload) {
    state.youtubePlayListItems = payload
  },
  SET_MORE_YOUTUBE_PLAYLIST_ITEMS(state, payload) {
    payload.forEach((item) => {
      state.youtubePlayListItems.items.push(item)
    })
  },
  SET_HOME_CURRENT_COMP(state, payload) {
    state.homeCurrentComp = payload
  },
  SET_TEMP_ARRAY(state, payload) {
    const filteredArr = payload.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])
    state.tempSingleMessage = filteredArr
    if (state.tempSingleMessage.length > 0) {
      state.tempSingleMessage[
        state.tempSingleMessage.length - 1
      ].selected = true
      if (state.tempSingleMessage.every((item) => item.selected === true)) {
        state.allExpanded = true
      }
    }
  },
  SET_SINGLE_MESSAGE_SHOW(state, payload) {
    state.selectedMessage = payload.singleEmail
    state.allExpanded = false
  },
  SET_CURRENT_YOUTUBE_CONTENT(state, payload) {
    state.currentYoutubeContent = payload
  },
  SET_YOUTUBE_VIDEO_DURATION(state, payload) {
    const shortDuration = payload.split(',')[0]
    const selectedVideo = payload.split(',')[1]
    const fullFormDuration = shortDuration.split(':')
    if (fullFormDuration.length === 3) {
      const fullDuration = `${fullFormDuration[0]} hour ${fullFormDuration[1]} min ${fullFormDuration[2]} sec`
      for (let i = 0; i < state.articles.items.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (state.articles.items[i].id === selectedVideo) {
          state.articles.items[i].fullDuration = fullDuration
        }
      }
      for (let i = 0; i < state.tempArticles.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (state.tempArticles[i].id === selectedVideo) {
          state.tempArticles[i].fullDuration = fullDuration
        }
      }
    } else if (fullFormDuration.length === 2) {
      const fullDuration = `${fullFormDuration[0]} min ${fullFormDuration[1]} sec`
      for (let i = 0; i < state.articles.items.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (state.articles.items[i].id == selectedVideo) {
          state.articles.items[i].fullDuration = fullDuration
        }
      }
      for (let i = 0; i < state.tempArticles.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (state.tempArticles[i].id == selectedVideo) {
          state.tempArticles[i].fullDuration = fullDuration
        }
      }
    } else {
      const fullDuration = `${fullFormDuration[0]} sec`
      for (let i = 0; i < state.articles.items.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (state.articles.items[i].id == selectedVideo) {
          state.articles.items[i].fullDuration = fullDuration
        }
      }
      for (let i = 0; i < state.tempArticles.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (state.tempArticles[i].id == selectedVideo) {
          state.tempArticles[i].fullDuration = fullDuration
        }
      }
    }
    for (let i = 0; i < state.articles.items.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (state.articles.items[i].id == selectedVideo) {
        state.articles.items[i].shortDuration = shortDuration
      }
    }
    for (let i = 0; i < state.tempArticles.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (state.tempArticles[i].id == selectedVideo) {
        state.tempArticles[i].shortDuration = shortDuration
      }
    }
  },
  SET_CURRENT_TAB(state, payload) {
    state.currentTab = payload
    state.allExpanded = false
    state.emailDynamicComp = 'EmailContent'
    setTimeout(() => {
      this.dispatch('home/getAllSocialArticle', state.currentSocialComponent.id)
    }, 500)
    const tempObj = JSON.parse(JSON.stringify(state.articles))
    if (state.currentSocialComponent.provider === 'Google') {
      if (state.currentTab === 'Incoming') {
        let tempArray = tempObj.items
        tempArray = tempArray.filter((element) =>
          element.labels.includes('INBOX')
        )
        tempObj.items = tempArray
        state.selectedMessage = tempObj.items[0]
      } else if (state.currentTab === 'Outgoing') {
        let tempArray = tempObj.items
        tempArray = tempArray.filter((element) =>
          element.labels.includes('SENT')
        )
        tempObj.items = tempArray
        state.selectedMessage = tempObj.items[0]
      } else {
        const tempObj = JSON.parse(JSON.stringify(state.articles))
        for (let i = 0; i < tempObj.items.length; i++) {
          for (let j = i + 1; j < tempObj.items.length; j++) {
            if (
              (tempObj.items[i].historyId === tempObj.items[j].historyId ||
                tempObj.items[i].threadId === tempObj.items[j].threadId) &&
              tempObj.items[i].labels.includes('SENT')
            ) {
              tempObj.items.splice(i, 1)
            }
          }
        }
        state.selectedMessage = tempObj.items[0]
      }
    } else if (state.currentSocialComponent.provider === 'Microsoft') {
      if (state.currentTab === 'Incoming') {
        let tempArray = tempObj.items
        tempArray = tempArray.filter(
          (element) => element.isDeliveryReceiptRequested === null
        )
        tempObj.items = tempArray
        state.selectedMessage = tempObj.items[0]
      } else if (state.currentTab === 'Outgoing') {
        let tempArray = tempObj.items
        tempArray = tempArray.filter(
          (element) => element.isDeliveryReceiptRequested === false
        )
        tempObj.items = tempArray
        state.selectedMessage = tempObj.items[0]
      } else {
        const tempObj = JSON.parse(JSON.stringify(state.articles))
        for (let i = 0; i < tempObj.items.length; i++) {
          for (let j = i + 1; j < tempObj.items.length; j++) {
            if (
              tempObj.items[i].conversationId ===
              tempObj.items[j].conversationId &&
              tempObj.items[i].isDeliveryReceiptRequested === false
            ) {
              tempObj.items.splice(i, 1)
            }
          }
        }
        state.selectedMessage = tempObj.items[0]
      }
    }
  },
  SET_EXPAND_ALL(state, payload) {
    state.allExpanded = payload
  },
  SHOW_CURRENT_CONTENT(state, payload) {
    state.tempSingleMessage.forEach((item) => {
      if (item.id === payload) {
        item.selected = !item.selected
        // item.individualSelect = !item.individualSelect
        // if (item.individualSelect) {
        //   item.selected = true
        // } else {
        //   item.selected = false
        // }
      }
      // else {
      //   item.individualSelect = false
      // }
    })

    const value = state.tempSingleMessage.every(
      (item) => item.selected === true
    )
    if (value === true) {
      state.allExpanded = true
    }
    const secondValue = state.tempSingleMessage.every(
      (item) => item.selected === false
    )
    if (secondValue === true) {
      state.allExpanded = false
    }
  },
  EXPAND_All(state) {
    if (state.allExpanded === true) {
      state.allExpanded = false
      state.tempSingleMessage.forEach((item) => {
        item.selected = false
      })
    } else if (state.allExpanded === false) {
      state.allExpanded = true
      state.tempSingleMessage.forEach((item) => {
        item.selected = true
      })
    }
  },
  SET_EMAIL_DYNAMIC_COMP(state, payload) {
    state.emailDynamicComp = payload.comp
    state.singleMessage = payload.attachments
    state.index = payload.attachmentIndex
    state.currentIndex = payload.currentIndex
    state.messageId = payload.messageId
    state.attachment = payload.attachment
  },
  SET_CURRENT_PAGE_NUMBER(state, payload) {
    state.currentIndex = payload.currentIndex
  },
  EXPAND_FULL_IMAGE(state, payload) {
    state.expandFullImage = payload
  },
  SET_ALL_LATEST_DATA(state, payload) {
    state.latest.tbody = payload
  },
  SET_VIDEO_DURATION(state, payload) {
    state.tempArticles = payload
    payload.map((item) => {
      let fullDuration
      if (item.duration && item.duration.includes('PT')) {
        fullDuration = item.duration.split('PT')
      }
      if (fullDuration[1].includes('H')) {
        const totalHour = fullDuration[1].split('H')[0]
        const totalMinute = fullDuration[1].split('H')[1].split('M')[0]
        const totalSecond = fullDuration[1]
          .split('H')[1]
          .split('M')[1]
          .split('S')[0]
        const timeAndId =
          totalSecond.length > 1
            ? `${totalHour}:${totalMinute}:${totalSecond},${item.id}`
            : `${totalHour}:${totalMinute}:0${totalSecond},${item.id}`
        this.commit('home/SET_YOUTUBE_VIDEO_DURATION', timeAndId)
      } else if (fullDuration[1].includes('M')) {
        const totalMinute = fullDuration[1].split('M')[0]
        const totalSecond = fullDuration[1].split('M')[1].split('S')[0]
        const timeAndId =
          totalSecond.length > 1
            ? `${totalMinute}:${totalSecond},${item.id}`
            : `${totalMinute}:0${totalSecond},${item.id}`
        this.commit('home/SET_YOUTUBE_VIDEO_DURATION', timeAndId)
      } else {
        const totalSecond = fullDuration[1].split('S')[0]
        const timeAndId =
          totalSecond.length > 1
            ? `0:${totalSecond},${item.id}`
            : `0:0${totalSecond},${item.id}`
        this.commit('home/SET_YOUTUBE_VIDEO_DURATION', timeAndId)
      }
      return 0
    })
    state.tempArticles = payload
  },
  SET_ALL_SOCIAL_ARTICLE(state, payload) {
    if (
      state.currentSocialComponent.provider !== 'Twitter' &&
      state.currentSocialComponent.provider !== 'Google' &&
      state.currentSocialComponent.provider !== 'Microsoft' &&
      state.currentSocialComponent.provider !== 'YouTube'
    ) {
      state.articles = payload
    } else if (state.currentSocialComponent.provider === 'Google') {
      payload.items.forEach((element) => {
        element.selected = false
        element.individualSelect = false
        if (element.from) {
          if (element.from.includes('<')) {
            const array = element.from.split('<')
            element.from = array[0]
            element.email = '(' + array[1].replace(/>/g, ')')
          } else {
            element.from = ''
            element.email = element.from
          }
        }
      })
      state.articles = payload
      state.selectedMessage = state.articles.items[0]
    } else if (state.currentSocialComponent.provider === 'Microsoft') {
      payload.items.forEach((element) => {
        element.selected = false
        element.individualSelect = false
      })
      state.articles = payload
      state.selectedMessage = state.articles.items[0]
    } else if (state.currentSocialComponent.provider === 'YouTube') {
      payload.items.forEach(item => {
        if (item.transcript.length > 0) {
          item.transcript.forEach(element => {
            const hrs = ~~(element.start / 3600);
            const mins = ~~((element.start % 3600) / 60);
            const secs = ~~element.start % 60;
            // Output like "1:01" or "4:03:59" or "123:03:59"
            let ret = "";
            if (hrs > 0) {
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            element.start = ret
          })
        }
      })
      state.articles = payload
    } else {
      payload.items.forEach((item) => {
        if (item.entities.urls !== undefined) {
          item.entities.urls.forEach((value) => {
            if (item.text.includes(value.url)) {
              if ('value.url' in state.words === false) {
                state.words[value.url] =
                  '<a rel="noopener noreferrer" class="text-blue-600" href="' +
                  value.url +
                  '" target="_blank">' +
                  value.display_url +
                  '</a>'
              }
            }
          })
          Object.keys(state.words).forEach((key) => {
            item.text = item.text.replaceAll(key, state.words[key])
          })
        }
        return item.text
      })
      state.articles = payload
    }
  },
  SET_LOADING_ARTICLE(state, payload) {
    state.loadArticles = payload
  },
  SET_LOADING_MORE_ARTICLE_SKELATON(state, payload) {
    state.loadMoreArticlesSkelaton = payload
  },
  SET_LOADING_MORE_ARTICLE(state, payload) {
    state.loadMoreArticles = payload
  },
  SET_CURRENT_HEADER(state, payload) {
    state.currentHeader = payload
  },
  SET_CURRENT_MESSAGE(state, payload) {
    state.currentMessage = payload
  },
  SET_SHOW_MOBILE_MENU(state, payload) {
    state.showMobileMenu = payload
  },
  SET_CURRENT_SOCIAL_COMPONENT(state, payload) {
    state.currentSocialComponent = payload
    state.selectedFeed = payload.selectedFeed
    // if (((state.currentSocialComponent.provider === 'Google') || (state.currentSocialComponent.provider === 'Microsoft') || (state.currentSocialComponent.provider === 'Calls') || (state.currentSocialComponent.provider === 'Faxes') || (state.currentSocialComponent.provider === 'Texts') || (state.currentSocialComponent.provider === 'Websites') || (state.currentSocialComponent.provider === 'Youtube')) && state.currentHeader !== 'LatestArchive') {
    //   state.currentHeader = "RealTimeFeed"
    // }
    setTimeout(() => {
      this.dispatch('home/getAllSocialArticle', payload.id)
      this.dispatch('home/getAllMessagePersons', payload.id)
      if (state.currentSocialComponent.provider === 'YouTube') {
        this.dispatch('home/getYoutubePlaylist', payload.id)
      }
    }, 500)
  },
  SET_LOAD_MORE_ARTICLES(state, payload) {
    if (
      state.currentSocialComponent.provider !== 'Twitter' &&
      state.currentSocialComponent.provider !== 'Google' &&
      state.currentSocialComponent.provider !== 'Microsoft' &&
      state.currentSocialComponent.provider !== 'YouTube'
    ) {
      payload.items.forEach((value) => {
        state.articles.items.push(value)
      })
    } else if (state.currentSocialComponent.provider === 'Google') {
      payload.items.forEach((element) => {
        // if (state.allExpanded) {
        //   element.selected = true
        // } else {
        element.selected = false
        // }
        element.individualSelect = false
        if (
          element.from &&
          element.from.includes('<') &&
          element.from.includes('>')
        ) {
          const array = element.from.split(' <')
          element.from = array[0]
          element.email = '(' + array[1].replace(/>/g, ')')
        }
      })
      payload.items.forEach((value) => {
        state.articles.items.push(value)
      })
    } else if (state.currentSocialComponent.provider === 'Microsoft') {
      payload.items.forEach((element) => {
        // if (state.allExpanded) {
        //   element.selected = true
        // } else {
        element.selected = false
        // }
        element.individualSelect = false
      })
      payload.items.forEach((value) => {
        state.articles.items.push(value)
      })
    } else if (state.currentSocialComponent.provider === 'YouTube') {
      payload.items.forEach(item => {
        if (item.transcript.length > 0) {
          item.transcript.forEach(element => {
            const hrs = ~~(element.start / 3600);
            const mins = ~~((element.start % 3600) / 60);
            const secs = ~~element.start % 60;
            // Output like "1:01" or "4:03:59" or "123:03:59"
            let ret = "";
            if (hrs > 0) {
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            element.start = ret
          })
        }
      })
      payload.items.forEach((value) => {
        state.articles.items.push(value)
      })
    } else {
      payload.items.forEach((value) => {
        if (value.entities.urls !== undefined) {
          value.entities.urls.forEach((item) => {
            if (value.text.includes(item.url)) {
              if ('item.url' in state.words === false) {
                state.words[item.url] =
                  '<a rel="noopener noreferrer" class="text-blue-600" href="' +
                  item.url +
                  '" target="_blank">' +
                  item.display_url +
                  '</a>'
              }
            }
          })
          Object.keys(state.words).forEach((key) => {
            value.text = value.text.replaceAll(key, state.words[key])
          })
        }
        state.articles.items.push(value)
      })
    }

    if (state.currentSocialComponent.provider === 'YouTube') {
      this.commit('home/SET_VIDEO_DURATION', state.articles.items)
    }
  },
  SET_HEIGHT(state, payload) {
    state.bodyHeight = payload
  },
  SET_MOBILE_HEIGHT(state, payload) {
    state.bodyMobileHeight = payload
  },
  SET_EXPAND(state, payload) {
    state.detailsExpand = payload
  },
  SET_SHOW_COMP(state, payload) {
    state.showComp = payload
  },
  SET_SELECTED_ITEM(state, payload) {
    state.websiteLog.tbody.forEach((item) => {
      if (item.id === payload) {
        item.selected = !item.selected
      }
    })
  },
  SET_TWITTER_COMMENT(state, payload) {
    state.twitterComment = payload
  },
  SET_PREVIOUS_TWITTER_COMMENT(state, payload) {
    state.previousTwitterComment.unshift(payload)
  },
  BACK_TO_PREVIOUS_COMMENT(state, payload) {
    state.twitterComment = payload
    state.previousTwitterComment.splice(0, 1)
  },
  RESET_TWITTER_COMMENTS(state) {
    state.twitterComment = []
  },
  RESET_PREVIOUS_TWITTER_COMMENTS(state) {
    state.previousTwitterComment = []
  },
  SET_ALL_MESSAGE_PERSONS(state, payload) {
    if (payload.items.length > 0) {
      payload.items.forEach((item) => {
        item.selected = false
        if (
          item.participants.length === 1 &&
          payload.provider === 'Instagram'
        ) {
          item.participants[1] = {
            profileImageUrl: '',
            username: 'Instagram User',
          }
        }
      })
      payload.items[0].selected = true
    }
    state.allMessagePersons = payload
  },
  SET_MESSAGE_SKELETON(state, payload) {
    state.showMessageskeleton = payload
  },
  SET_PERSON_SKELETON(state, payload) {
    state.showPersonSkeleton = payload
  },
  SET_MORE_MESSAGE_SKELETON(state, payload) {
    state.showMoreMessageSkeleton = payload
  },
  SET_SINGLE_CONVERTIONS(state, payload) {
    state.singleCovertions = payload
    if (state.singleCovertions) {
      state.singleCovertions.messages = payload.messages.reverse()
      state.allMessagePersons.items.forEach((element) => {
        if (element.id === payload.id) {
          element.messageCount = payload.messageCount
          element.snippet = payload.snippet
          element.unreadCount = payload.unreadCount
          element.updatedAt = payload.updatedAt
          element.selected = true
        }
        if (element.id !== payload.id) {
          element.selected = false
        }
      })
    }
  },
  SET_PAGE_ID(state, payload) {
    state.pageId = payload
  },
  SET_PARTICIPANT(state, payload) {
    state.participant = payload
  },
  SET_CONVERSATION_USER(state, payload) {
    state.person = payload
    if (
      payload.participants !== null &&
      state.currentSocialComponent.provider === 'Facebook'
    ) {
      state.conversationOwner = payload.participants[1]
      state.conversationUser = payload.participants[0]
    } else if (
      payload.participants !== null &&
      state.currentSocialComponent.provider === 'Instagram'
    ) {
      state.conversationOwner = payload.participants[0]
      state.conversationUser = payload.participants[1]
      state.conversationUser.name = payload.name
    } else {
      state.conversationOwner = null
      state.conversationUser = null
    }
  },
  SET_SEE_MORE_MESSAGES(state, payload) {
    state.newLoadMessages = payload
    payload.forEach((item) => {
      state.singleCovertions.messages.unshift(item)
    })
  },
  RESET_LOAD_MORE_MESSAGES(state) {
    state.newLoadMessages = [1]
  },
  SET_MESSAGE_COUNT(state, payload) {
    state.messageCount = payload
  },
  SET_SHOW_OPTIONS(state, payload) {
    state.showOptionsOverAll = payload
  },
  SET_SEARCH_TEXT(state, payload) {
    state.searchText = payload
  },
  SET_FEEDS_DROPDOWN(state, payload) {
    state.feedsDropdown = payload
  },
  SET_OLDEST_JOINING_DATE_TIME(state, payload) {
    state.getOldJoiningDateTime = payload
  }
}

const actions = {
  async getAllLatestData({ commit }) {
    try {
      const response = await this.$axios.$get(LATEST_ARCHIVE, {
        mode: 'no-cors',
      })
      commit('SET_ALL_LATEST_DATA', response.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getAllSocialArticle({ commit, state }, payload) {
    commit('SET_LOADING_ARTICLE', true)
    try {
      const response = await this.$axios.$get(
        state.currentTab === 'Incoming' || state.currentTab === 'Outgoing'
          ? `${SOCIAL_ARTICLE}?accountId=${payload}&messageType=${state.currentTab}`
          : `${SOCIAL_ARTICLE}?accountId=${payload}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success || response.status === 200) {
        commit('SET_LOADING_ARTICLE', false)
        commit('SET_LOADING_MORE_ARTICLE', true)
        commit('SET_ALL_SOCIAL_ARTICLE', response.data)
        commit('SET_EXPAND_ALL', false)
      }
    } catch (err) {
      console.log(err)
      commit('SET_LOADING_ARTICLE', false)
    }
  },
  async loadMoreArticles({ commit, state, getters }) {
    this.$toast.clear()
    const accountId1 = state.currentSocialComponent.id
    const lastItemId1 = state.articles.items[state.articles.items.length - 1].id
    commit('SET_LOADING_MORE_ARTICLE_SKELATON', true)
    try {
      const { status, success, data } = await this.$axios.$get(
        state.currentTab === 'Incoming' || state.currentTab === 'Outgoing'
          ? `${SOCIAL_ARTICLE_LOAD_MORE}?accountId=${accountId1}&lastItemId=${lastItemId1}&messageType=${state.currentTab}`
          : `${SOCIAL_ARTICLE_LOAD_MORE}?accountId=${accountId1}&lastItemId=${lastItemId1}`
      )
      if (success || status === 200) {
        if (data.items.length > 0) {
          commit('SET_LOAD_MORE_ARTICLES', data)
        } else if (data.items.length === 0) {
          commit('SET_LOADING_MORE_ARTICLE_SKELATON', false)
          this.$toast.clear()
          commit('SET_LOADING_MORE_ARTICLE', false)
          if (!state.loadMoreArticlesSkelaton) {
            this.$toast.success('No more post to be loaded', {
              className: ['toasted-bg-archive'],
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LOADING_MORE_ARTICLE_SKELATON', false)
    }
  },
  async getAllMessagePersons({ commit }, payload) {
    commit('SET_PERSON_SKELETON', true)
    try {
      const response = await this.$axios.$get(
        `${ALL_MESSAGE_PERSONS}?accountId=${payload}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success || response.status === 200) {
        commit('SET_PERSON_SKELETON', false)
        commit('SET_ALL_MESSAGE_PERSONS', response.data)
        if (response.data.items.length > 0) {
          this.dispatch('home/getSingleConvertions', {
            provider: response.data.provider,
            person: response.data.items[0],
          })
        } else {
          commit('SET_PERSON_SKELETON', false)
          commit('SET_SINGLE_CONVERTIONS', null)
          commit('SET_CONVERSATION_USER', { participants: null })
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getSingleConvertions({ commit, state }, payload) {
    commit('SET_MESSAGE_COUNT', payload.person.messageCount)
    commit('SET_MESSAGE_SKELETON', true)
    commit('SET_CONVERSATION_USER', payload.person)
    commit('SET_PAGE_ID', payload.person.pageId)
    try {
      const response = await this.$axios.$get(
        `${SINGLE_CONVERTIONS}?provider=${payload.provider}&chatId=${payload.person.id}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success || response.status === 200) {
        commit('SET_MESSAGE_SKELETON', false)
        commit('SET_SINGLE_CONVERTIONS', response.data)
        commit('RESET_LOAD_MORE_MESSAGES')
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getMoreMessages({ commit }, payload) {
    try {
      const response = await this.$axios.$get(
        `${GET_MORE_MESSAGES}?provider=${payload.provider}&chatId=${payload.chatId}&lastItemId=${payload.id}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success || response.status === 200) {
        commit('SET_MORE_MESSAGE_SKELETON', false)
        commit('SET_SEE_MORE_MESSAGES', response.data)
        if (response.data.length === 0) {
          commit('SET_MORE_MESSAGE_SKELETON', false)
          this.$toast.success('No more message to be loaded', {
            className: ['toasted-bg-archive'],
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getSearchPerson({ commit, state }, payload) {
    try {
      const response = await this.$axios.$get(
        `${ALL_MESSAGE_PERSONS}?accountId=${state.currentSocialComponent.id}&searchText=${payload}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success) {
        commit('SET_ALL_MESSAGE_PERSONS', response.data)
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getSearchMessage({ commit, state }, payload) {
    try {
      const response = await this.$axios.$get(
        `${SINGLE_CONVERTIONS}?provider=${state.currentSocialComponent.provider}&chatId=${state.person.id}&searchText=${payload}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success) {
        commit('SET_SINGLE_CONVERTIONS', response.data)
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getYoutubePlaylist({ commit, state }, payload) {
    try {
      const response = await this.$axios.$get(
        `${YOUTUBE_PLAYLIST}?accountId=${payload}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success || response.status === 200) {
        commit('SET_YOUTUBE_PLAYLIST', response.data)
        if (response.data.playlists.length > 0) {
          this.dispatch('home/getYoutubePlaylistItem', {
            provider: response.data.provider,
            playlist: response.data.playlists[0],
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getYoutubePlaylistItem({ commit, state }, payload) {
    const accountId1 = state.currentSocialComponent.id
    const lastItemId1 = state.articles.items[state.articles.items.length - 1].id
    let moreArticles = JSON.parse(JSON.stringify(state.articles.items))
    try {
      const { status, success, data } = await this.$axios.$get(
        `${SOCIAL_ARTICLE_LOAD_MORE}?accountId=${accountId1}&lastItemId=${lastItemId1}`
      )
      if (success || status === 200) {
        if (data.items.length > 0) {
          data.items.forEach((item) => {
            moreArticles.push(item)
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
    commit('SET_VIDEO_DURATION', moreArticles)
    moreArticles = state.tempArticles
    try {
      const response = await this.$axios.$get(
        `${YOUTUBE_PLAYLIST_ITEM}?provider=${payload.provider}&playlistId=${payload.playlist.id}`,
        {
          mode: 'no-cors',
        }
      )
      if (response.success || response.status === 200) {
        // response.data.items = response.data.items.reverse()
        response.data.items.forEach((item) => {
          moreArticles.forEach((value) => {
            if (item.videoId === value.socialId) {
              item.embedHtml = value.embedHtml
              item.fullDuration = value.fullDuration
              item.commentCount = value.commentCount
              item.dislikeCount = value.dislikeCount
              item.likeCount = value.likeCount
              item.viewCount = value.viewCount
              item.mainVideoId = value.id
              item.shortDuration = value.shortDuration
              item.privacy = value.privacy
              item.thumbnail = value.thumbnail
              item.title = value.title
              item.description = value.description
              item.transcript = value.transcript
            }
          })
        })
        commit('SET_YOUTUBE_PLAYLIST_ITEMS', response.data)
        if (!state.selectedPlayList && response.data) {
          setTimeout(() => {
            commit('SET_SELECTED_PlayList', true)
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  },
  async loadMorePlaylistItems({ commit, state }, payload) {
    const accountId1 = state.currentSocialComponent.id
    const lastItemId1 = state.articles.items[state.articles.items.length - 1].id
    let moreArticles = JSON.parse(JSON.stringify(state.articles.items))
    try {
      const { status, success, data } = await this.$axios.$get(
        `${SOCIAL_ARTICLE_LOAD_MORE}?accountId=${accountId1}&lastItemId=${lastItemId1}`
      )
      if (success || status === 200) {
        if (data.items.length > 0) {
          data.items.forEach((item) => {
            moreArticles.push(item)
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
    commit('SET_VIDEO_DURATION', moreArticles)
    moreArticles = state.tempArticles
    const lastPlayListItemId = state.youtubePlayListItems.items[state.youtubePlayListItems.items.length - 1].id
    try {
      const { status, success, data } = await this.$axios.$get(
        `${YOUTUBE_PLAYLIST_ITEM_MORE}?provider=${state.currentSocialComponent.provider}&playlistId=${state.youtubePlayListItems.id}&lastItemId=${lastPlayListItemId}`
      )
      if (success || status === 200) {
        if (data.length > 0) {
          data.forEach((item) => {
            moreArticles.forEach((value) => {
              if (item.videoId === value.socialId) {
                item.embedHtml = value.embedHtml
                item.fullDuration = value.fullDuration
                item.commentCount = value.commentCount
                item.dislikeCount = value.dislikeCount
                item.likeCount = value.likeCount
                item.viewCount = value.viewCount
                item.mainVideoId = value.id
                item.shortDuration = value.shortDuration
                item.privacy = value.privacy
                item.thumbnail = value.thumbnail
                item.title = value.title
                item.description = value.description
                item.transcript = value.transcript
              }
            })
          })
          commit('SET_MORE_YOUTUBE_PLAYLIST_ITEMS', data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  getHeight({ commit }, payload) {
    commit('SET_HEIGHT', payload)
  },
  getMobileHeight({ commit }, payload) {
    commit('SET_MOBILE_HEIGHT', payload)
  },
  setTwitterComments({ commit }, payload) {
    const mainReplies = []
    payload.data.forEach((item) => {
      if (item.referencedTweetsId === payload.socialId || (item.referencedTweetsId === payload.referencedTweetsId && payload.referencedTweetsType === 'retweeted')) {
        mainReplies.push(item)
      }
    })
    this.dispatch('home/setTwitterReplies', {
      mainReplies,
      data: payload.data,
    })
  },
  setTwitterReplies({ commit }, payload) {
    payload.mainReplies.forEach((item) => {
      item.replies = []
      payload.data.forEach((value) => {
        if (item.socialId === value.referencedTweetsId) {
          item.replies.push(value)
        }
      })
    })
    payload.mainReplies.forEach((item) => {
      if (item.replyCount > 0) {
        this.dispatch('home/setTwitterReplies', {
          mainReplies: item.replies,
          data: payload.data,
        })
      }
    })
    commit('SET_TWITTER_COMMENT', payload.mainReplies)
  },
  setTwitterPreviousComment({ commit }, payload) {
    commit('SET_PREVIOUS_TWITTER_COMMENT', payload.comments)
    commit('SET_TWITTER_COMMENT', payload.replies)
  },
  async getOldestJoiningDateTime({ commit }, payload) {
    try {
      const { data } = await this.$axios.get(SOCIAL_EARLIEST_DATE)
      if (data.success) {
        commit('SET_OLDEST_JOINING_DATE_TIME',data.date)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
