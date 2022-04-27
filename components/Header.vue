<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Nuxt 테스트</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse id="nav_collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/board">자유게시판</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <div class="user">{{ $store.state.loginUser.nickname }}</div>
      <div
        v-show="!$store.state.loginUser.isLogin"
        class="loginBtn"
        @click="loginOut"
      >
        로그인
      </div>
      <div
        v-show="$store.state.loginUser.isLogin"
        class="logoutBtn"
        @click="loginOut"
      >
        로그아웃
      </div>
    </b-navbar>
  </div>
</template>

<script>
// import { TempAdminApi, EndPoint, HttpMethod } from '~/util/TempAdminApi'
import { getUserInfo } from '~/api'
export default {
  data() {
    return {
      loginUser: this.$store.state.loginUser,
      loginState: this.$store.state.loginUser.isLogin ? '로그아웃' : '로그인',
    }
  },
  async created() {
    console.log('createheader')
    let result
    await getUserInfo().then((res) => {
      result = res.data
    })
    console.log(result)
    if (result?.isSuccess) {
      this.$store.commit('setLoginUser', {
        id: result.result.userId,
        nickname: result.result.nickname,
        isLogin: true,
      })
    }
  },
  methods: {
    loginOut() {
      if (this.$store.state.loginUser.isLogin) {
        this.$store.commit('logout')
        window.sessionStorage.clear()
        window.localStorage.clear()
      }
      this.$router.push('/login')
    },
  },
}
</script>

<style>
.user {
  margin-right: 10px;
}
.loginOutBtn:hover {
  cursor: pointer;
}
</style>