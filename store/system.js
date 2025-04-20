import { format, utcToZonedTime } from 'date-fns-tz'
import { TIME_ZONES, TIME_ZONE_WISH_DATE_FORMAT, TIME } from '~/constants/urls'

const DATE_FORMAT = 'DATE_FORMAT'
const TIME_FORMAT = 'TIME_FORMAT'
const TIME_ZONE = 'Time_Zone'
const FORMAT_DATA = 'FORMAT_DATA'
const FORMAT_TIME = 'FORMAT_TIME'
const UTC_TIME_ZONE = 'UTC_TIME_ZONE'
const TIME_ZONE_ID = 'TIME_ZONE_ID'
const TIME_ZONE_TEXT = 'TIME_ZONE_TEXT'

const state = () => ({
  allDate: [],
  allTimesZone: [],
  timeFormats: [
    { text: '24:00', value: 'HH:mm' },
    { text: '12:00 am', value: 'hh:mm aaa' },
    { text: '12:00 AM', value: 'hh:mm aa' },
    { text: '12:00:00 EST', value: 'hh:mm:ss zzz' },
    { text: '12:00:00 AM', value: 'pp' },
    { text: '12:00:00 AM GMT+2', value: 'ppp' },
  ],
  formatDate: 'MMMM dd, yyyy',
  formatTime: 'hh:mm aa',
  utcTimeZone: 'US/Arizona',
  timeId: 24,
  zoneText: 'Mountain Standard Time (UTC-7)',
})

const getters = {}

const mutations = {
  [DATE_FORMAT](state, payload) {
    state.allDate = payload
  },
  [TIME_FORMAT](state, payload) {
    state.timeFormats = payload
  },
  [TIME_ZONE](state, payload) {
    state.allTimesZone = payload
  },
  [FORMAT_DATA](state, payload) {
    state.formatDate = payload
  },
  [FORMAT_TIME](state, payload) {
    state.formatTime = payload
  },
  [UTC_TIME_ZONE](state, payload) {
    state.utcTimeZone = payload
  },
  [TIME_ZONE_ID](state, payload) {
    state.timeId = payload
  },
  [TIME_ZONE_TEXT](state, payload) {
    state.zoneText = payload
  },
}

const actions = {
  getAllTimeZones({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(TIME_ZONES)
        .then((response) => {
          resolve(response)
          if (response.success) {
            commit(TIME_ZONE, response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  async getTimeZoneWiseDate({ commit, state }) {
    try {
      const res = await this.$axios.$get(TIME_ZONE_WISH_DATE_FORMAT)
      if (res.success) {
        const currentDate = []
        let currentDateFormat = null
        res.data.forEach((item) => {
          const date = new Date()
          const timeZone = state.utcTimeZone
          const zonedDate = utcToZonedTime(date, timeZone)
          currentDateFormat = format(zonedDate, `${item.value}`, {
            timeZone,
          })
          currentDate.push({
            id: item.id,
            text: currentDateFormat,
            value: item.value,
          })
        })
        commit(DATE_FORMAT, currentDate)
      }
    } catch (error) {}
  },
  getAllTimeFormats({ commit, state }) {
    const currentTime = []
    let currentTimeFormat = null
    state.timeFormats.forEach((item) => {
      const date = new Date()
      const timeZone = state.utcTimeZone
      const zonedDate = utcToZonedTime(date, timeZone)
      currentTimeFormat = format(zonedDate, `${item.value}`, {
        timeZone,
      })
      currentTime.push({
        id: item.id,
        text: currentTimeFormat,
        value: item.value,
      })
    })
    commit(TIME_FORMAT, currentTime)
  },
  getFormatDate({ commit }, payload) {
    commit(FORMAT_DATA, payload)
  },
  getFormatTime({ commit }, payload) {
    commit(FORMAT_TIME, payload)
  },
  getutcTimeZone({ commit }, payload) {
    commit(UTC_TIME_ZONE, payload)
  },
  getTimeZoneId({ commit }, payload) {
    commit(TIME_ZONE_ID, payload)
  },
  getTimeZoneText({ commit }, payload) {
    commit(TIME_ZONE_TEXT, payload)
  },
  async getAllTimes({ commit, state, dispatch }) {
    try {
      const response = await this.$axios.$get(TIME)
      if (response.success) {
        state.allTimesZone.forEach((item) => {
          if (item.id === Number(response.data.timeZoneId)) {
            commit(UTC_TIME_ZONE, item.value)
          }
        })
        if (
          response.data.dateFormat &&
          response.data.timeFormat &&
          response.data.timeZoneId &&
          response.data.timeZone
        ) {
          commit(FORMAT_DATA, response.data.dateFormat)
          commit(FORMAT_TIME, response.data.timeFormat)
          commit(TIME_ZONE_ID, Number(response.data.timeZoneId))
          commit(TIME_ZONE_TEXT, response.data.timeZone)

          dispatch('getTimeZoneWiseDate')
          dispatch('getAllTimeFormats')
        }
      } else {
        dispatch('getTimeZoneWiseDate')
        dispatch('getAllTimeFormats')
      }
    } catch (error) {
      console.log(error)
    }
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
