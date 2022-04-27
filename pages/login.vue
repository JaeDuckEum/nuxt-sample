<template>
  <div class="loginRegisterContainer">
    <div class="loginRegisterFormBox">
      <input
        type="text"
        placeholder="이메일"
        :value="username"
        @change="onChangeUsername($event)"
      />
      <input
        type="password"
        placeholder="패스워드"
        :value="password"
        @change="onChangePassword($event)"
      />
      <div style="height: 100px"></div>
      <button style="height: 50px; width: 100px" @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
import { isEmpty } from '~/util/SessionManager'
import { TempAdminApi, EndPoint, HttpMethod } from '~/util/TempAdminApi'

import { sessionSet } from '~/util/expirySession'
export default {
  // layout: 'login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onChangeUsername(e) {
      this.username = e.target.value
    },
    onChangePassword(e) {
      this.password = e.target.value
    },
    async login() {
      if (isEmpty(this.username.trim())) {
        alert('이메일을 입력해 주세요.')
        return
      }

      if (isEmpty(this.password)) {
        alert('비밀번호를 입력해 주세요.')
      }

      try {
        const { data: res } = await TempAdminApi.request({
          data: {
            email: this.username.trim(),
            password: this.password,
          },
          method: HttpMethod.POST,
          url: EndPoint.POST_USER_LOGIN,
        })

        if (!res?.isSuccess || isEmpty(res?.result?.token)) {
          alert(res?.message)
          return
        }

        sessionSet('isLogined', true)
        sessionSet('jwt', res.result.token)

        this.$store.commit('setLoginUser', {
          id: res.result.userId,
          nickname: res.result.nickname,
          isLogin: true,
        })

        alert('로그인 성공')
        this.$router.push({
          path: '/',
        })
      } catch (error) {
        console.log(error)
        alert('로그인 실패')
      }
    },
  },
}
</script>

<style>
</style>