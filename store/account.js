import { USER_PERMISSIONS, ALERT_PERMISSIONS } from '~/constants/urls'


const state = () => ({
    userPermissions: [],
    alertPermissions: [],
})

const getters = {

}

const mutations = {
    SET_USER_PERMISSIONS(state, payload) {
        state.userPermissions = payload
    },
    SET_ALERT_PERMISSIONS(state, payload) {
        state.alertPermissions = payload
    },
}

const actions = {
    fetchUserPermissons({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios
                .$get(USER_PERMISSIONS)
                .then((response) => {
                    resolve(response)
                    if (response.success) {
                        commit('SET_USER_PERMISSIONS', response.data)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    fetchAlertPermissons({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios
                .$get(ALERT_PERMISSIONS)
                .then((response) => {
                    resolve(response)
                    if (response.success) {
                        commit('SET_ALERT_PERMISSIONS', response.data)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
