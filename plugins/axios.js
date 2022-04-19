import { axios } from "../nuxt.config";

const _this = this
let loading = true

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
    console.log('config: ' + config)
    console.log('SPY: ' + config.url)
    console.log('_this.loading: ' + _this.loading)
    if ( _this.loading ) $nuxt.$loading.start()
    $axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'
  })

  $axios.onResponse((res) => {
    const data = res.data
    let resErrMsg;
    let result, errorMessage, rtnData
    if ( data ) {
      result = data.result
      errorMessage = data.errorMessage
      rtnData = data.data
    } else {
      resErrMsg = '시스템 오류가 발생 하였습니다.'
      alert(resErrMsg)
      throw new Error(resErrMsg)
    }

    if ( result === 0 ) {
      if ( errorMessage && errorMessage != '' ) {
        resErrMsg = errorMessage
        alert(resErrMsg)
      } else {
        resErrMsg = '시스템 오류가 발생 하였습니다.'
        alert(resErrMsg)
      }
      throw new Error(resErrMsg)
    }

    if ( _this.loading ) $nuxt.$loading.finish()
    _this.loading = true
  })

  $axios.onError((error) => {
    if ( _this.loading ) $nuxt.$loading.finish()
    _this.loading = true
    // TODO. HttpStatus 코드에 따라 처리 방안 추가 필요
    console.log('axios commor error : ', error)
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/400"); // 400 에러 발생시 /400으로 리다이렉트
    }
  })

  $axios.setLoading = data => {
    console.log('data : ', data)
    _this.loading = data
    console.log('this.loading : ', _this.loading)
  }
}