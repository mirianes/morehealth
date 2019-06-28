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
        token: '',
        usf: {},
        doctor: {}
    },
    mutations: {
        setUser (store, user) {
            store.user = user
        },
        setToken (store, token) {
            store.token = token
        },
        setUsf (store, usf) {
            store.usf = usf
        },
        setDoctor (store, doctor) {
            store.doctor = doctor
        },
        logout (store) {
            store.token = ''
            store.user = {}
        }
    },
    getters: {
        user: store => store.user,
        isLogged: store => store.token !== '',
        usf: store => store.usf,
        doctor: store => store.doctor
    },
    actions: {
        setUser ({ commit }, user) {
            commit('setUser', user)
        },
        login ({ commit }, data) {
            commit('setUser', data.user)
            commit('setToken', data.token)
        },
        setInfo ({ commit }, data) {
            commit('setUsf', data.usf)
            commit('setDoctor', data.doctor)
        },
        logout ({ commit }) {
            commit('logout')
        }
    }
})

export default store