export const state = () => ({
  loginUser: { isLogin: false },
})

export const getters = () => {}

export const mutations = {
  setLoginUser(state, loginUser) {
    state.loginUser = loginUser
  },
  logout(state) {
    state.loginUser = { isLogin: false }
  },
}
