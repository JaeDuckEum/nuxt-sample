// import { axios } from '../nuxt.config'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const loading = true

export default function ({ $axios, store, redirect }) {
  // eslint-disable-next-line prefer-const
  let loading = true
  $axios.onRequest((config) => {
    store._vm.$nextTick(() => {
      console.log('config: ' + config)
      console.log('store : ', store)
      // if (loading) store._vm.$nuxt.$loading.start()
      $axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'
    })
  })

  $axios.onResponse((res) => {
    const data = res.data
    let resErrMsg
    let result, errorMessage
    if (data) {
      result = data.result
      errorMessage = data.errorMessage
    } else {
      resErrMsg = '시스템 오류가 발생 하였습니다.'
      alert(resErrMsg)
      throw new Error(resErrMsg)
    }

    if (result === 0) {
      if (errorMessage && errorMessage !== '') {
        resErrMsg = errorMessage
        alert(resErrMsg)
      } else {
        resErrMsg = '시스템 오류가 발생 하였습니다.'
        alert(resErrMsg)
      }
      throw new Error(resErrMsg)
    }
    store._vm.$nextTick(() => {
      // if (loading) store._vm.$nuxt.$loading.finish()
      loading = true
    })
  })

  $axios.onError((error) => {
    store._vm.$nextTick(() => {
      // if (loading) store._vm.$nuxt.$loading.finish()
      loading = true
    })
    // TODO. HttpStatus 코드에 따라 처리 방안 추가 필요
    // eslint-disable-next-line no-console
    console.log('axios commor error : ', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400') // 400 에러 발생시 /400으로 리다이렉트
    }
  })

  $axios.setLoading = (data) => {
    loading = data
  }
}
