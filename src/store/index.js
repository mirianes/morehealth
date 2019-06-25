import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'moreHealth',
    storage: localStorage
})

const store = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        user: {},
        token: ''
    },
    mutations: {
        setUser (store, user) {
            store.user = user
        },
        setToken (store, token) {
            store.token = token
        },
        logout (store) {
            store.token = ''
            store.user = {}
        }
    },
    getters: {
        user: store => store.user,
        isLogged: store => store.token !== ''
    },
    actions: {
        setUser ({ commit }, user) {
            commit('setUser', user)
        },
        login ({ commit }, data) {
            commit('setUser', data.user)
            commit('setToken', data.token)
        },
        logout ({ commit }) {
            commit('logout')
        }
    }
})

export default store