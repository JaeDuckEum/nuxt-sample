import Cookie from 'cookie'

// CLASSIC MODE
/*
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: ...,
    mutations: ...,
    actions: ...
}

export default createStore
*/

export const strict = true

// MODULES MODE
export const state = () => ({})

// Special Nuxt method called once on app initialization (only in index)
export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    console.log('process.server : ', process.server)
    if (process.server) {
      if ( req !== undefined && req.headers !== undefined ) {
        const cookies = Cookie.parse(req.headers.cookie || '')
        // eslint-disable-next-line dot-notation
        const token = cookies['token'] || ''
        if (token) return await dispatch('user/load', token)
      }
    }
  },
}
