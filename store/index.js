import data from '~/assets/flare-2.json'
export const state = () => ({
  loginUser: { isLogin: false },
  flare: data,
  zoomTree: { status: true },
  radialTree: { status: false },
})

export const getters = () => {}

export const mutations = {
  setLoginUser(state, data) {
    state.loginUser = data
  },
  logout(state) {
    state.loginUser = { isLogin: false }
  },
  setFlare(state, data) {
    state.flare = data
  },
  setZoomTree(state, data) {
    state.zoomTree = data
  },
  setRadialTree(state, data) {
    state.radialTree = data
  },
}
