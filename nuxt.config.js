module.exports = {

  // toggle SPA mode
  mode: 'spa',
  //mode: 'universal',

  // create extra file for netlify
  generate: { fallback: true },

  /*
  ** Headers of the page
  */
  head: {
    title: 'my-nuxt-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: [
    { src : '~/plugins/vue-notifications' },
    { src : '~/plugins/persistedState.js' },
    { src : '~/plugins/axios.js' },
    {src:'@/plugins/vue-tree-list', ssr:false}
  ],
  /*
  ** Module Config
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: 'http://localhost:8888',
    proxy: false,
    // retry: {
    //   retries: 4, // 최대 재전송 횟수 4회
    //   shouldResetTimeout: true, // 재전송 간 타임아웃을 리셋하기
    //   retryDelay: (retry) => {
    //     return retry * 100; // 재전송 횟수 * 0.1초만큼 재전송 시작 시간을 지연시키기
    //   },
    //   retryCondition: (error) => err.response.status === 429, // 서버 혼잡이 일어났을 경우에만 재전송하기
    // },
    //progress: true, // 로딩 바를 사용하지 않음 false
  },
  proxy : {
    '/sample/api' : {
      target: 'http://localhost:8888',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/': '/'
      }

    },
  },
  /*
  ** Customize the progress bar color
  */
  // loading: {
  //   color: 'DodgerBlue',
  //   height: '10px',
  //   continuous: true,
  //   duration: 3000
  // },

  /*
   ** Activate components - https://nuxtjs.org/docs/2.x/directory-structure/components#components-module
   */
  components: true,
  /*
   ** importing a custom loader. this will overwrite the default loader
   */
  loading: '~/components/LoadingBar.vue',
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
