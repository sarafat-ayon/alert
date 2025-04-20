import { ACTIVITY_LOGS } from "~/constants/urls"


const state = () => ({
    showNotificationModal: false,
    notificationMessageModal: {
        title: '',
        message: '',
        show: false
    },
    notifications: [],
    oldPositioningNotifications: [],
    showingNotificationsLimit: 100,
    emargencyCategory: 'error',
    total: 0,
    offset: 0,
    limit: 25
})

const getters = {
    isExistNotifications(state) {
        return !(state.notifications.length >= state.total)
    },
    unreadNotificationCount(state) {
        return state.notifications.filter(item => {
            return !item.is_read
        }).length
    },
    getNotifications(state) {
        const totalNotifications = JSON.parse(JSON.stringify(state.oldPositioningNotifications))
        const generalCategories = []
        const emargencyCategory = []
        totalNotifications.forEach(item => {
            if (item.category.toLowerCase() === state.emargencyCategory && !item.is_read) {
                emargencyCategory.push(item)
            } else {
                generalCategories.push(item)
            }
        })
        return emargencyCategory.concat(generalCategories)
    }
}

const mutations = {
    SHOW_NOTIFICATION_MODAL(state, payload) {
        state.showNotificationModal = payload
    },

    SHOW_NOTIFICATION_MESSAGE_MODAL(state, payload) {
        state.notificationMessageModal = payload
    },

    SET_ALL_NOTIFICATIONS(state, { count, data }) {
        if (state.offset === 0 && state.limit === 25) {
            state.oldPositioningNotifications = []
            state.notifications = []
        }
        state.oldPositioningNotifications = state.oldPositioningNotifications.concat(data)
        state.notifications = state.notifications.concat(data)
        state.offset = state.notifications.length
        state.total = count
        if (state.notifications.length >= state.total) {
            state.offset = 0
            state.limit = 0
        }
    },
    README_NOTIFICATION(state, payload) {
        state.oldPositioningNotifications.map((item) => {
            if (Number(item.id) === Number(payload.data[0].id)) {
                item.is_read = payload.data[0].is_read
            }
            return item
        })
    },
    READ_ALL_NOTIFICATIONS(state) {
        state.oldPositioningNotifications.map((item) => {
            if (!item.is_read) {
                item.is_read = true
            }
            return item
        })
    },
    DELETE_NOTIFICATION(state, payload) {
        state.notifications = state.notifications.filter((item) => {
            return Number(item.id) !== Number(payload)
        })
    },
    loadMoreNotifications(state, payload) {
        state.showingNotificationsLimit += payload
    },
    SET_OFFSET(state, payload) {
        state.offset = payload
    },
    SET_LIMIT(state, payload) {
        state.limit = payload
    },
    SET_NOTIFICATION(state, payload) {
        state.notifications = payload
    },
    SET_OLD_NOTIFICATION(state, payload) {
        state.oldPositioningNotifications = payload
    },
}

const actions = {
    notificationModal({ commit }, payload) {
        commit('SHOW_NOTIFICATION_MODAL', payload)
    },
    async getAllNotifications({ commit, state }) {
        try {
            const response = await this.$axios.$get(ACTIVITY_LOGS, {
                params: {
                    offset: state.offset,
                    limit: state.limit
                }
            })
            if (response.success) {
                commit('SET_ALL_NOTIFICATIONS', response)
            }
        } catch (error) {
            console.log(error);
        }
    },

    readMeNotification({ commit }, id) {
        return new Promise((resolve, reject) => {
            try {
                this.$axios.$post(ACTIVITY_LOGS, {
                    id,
                })
                    .then((response) => {
                        if (response.success) {
                            commit('README_NOTIFICATION', response)
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    },

    readAllNotifications({ commit }) {
        return new Promise((resolve, reject) => {
            try {
                this.$axios.$post(ACTIVITY_LOGS, {
                    id: -1,
                })
                    .then((response) => {
                        if (response.status === 200) {
                            commit('READ_ALL_NOTIFICATIONS')
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    },

    deleteNotification({ commit }, id) {
        return new Promise((resolve, reject) => {
            try {
                this.$axios.$delete(ACTIVITY_LOGS, {
                    data: {
                        id,
                    },
                })
                    .then((response) => {
                        if (response.success) {
                            commit('DELETE_NOTIFICATION', id)
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            } catch (error) {
                reject(error)
            }
        })
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}