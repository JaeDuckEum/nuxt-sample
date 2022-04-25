// import Mode from 'frontmatter-markdown-loader/mode'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line nuxt/no-cjs-in-config
// const path = require('path')
// import dotenv from "dotenv";
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
// dotenv.config({path: '.env.local'})
// require('dotenv').config({ filename: `.env.${process.env.NODE_ENV}` })
// require('dotenv').config({ filename: '.env.dev' })

export default {
  // Deployment Targets : default 'server'
  // target: 'static', // nuxt generate 이 경우에
  target: 'server',

  // mode : default 'universal'
  // mode: 'spa',
  mode: 'universal',

  server: {
    host: process.env.SERVER_HOST, // default: localhost
    port: process.env.SERVER_PORT,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'my-nuxt-project',
    titleTemplate: 'My amazing Nuxt application | %s',
    htmlAttrs: {
      lang: 'en',
      amp: true,
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project',
      },
      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://nuxtjs.org',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'My amazing Nuxt application',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'The amazing Nuxt application that teaches me all the cool features of Nuxt',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://nuxtjs.org/nuxt-card.png',
      },
      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
      { hid: 'og:site_name', property: 'og:site_name', content: 'Nuxt' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://nuxtjs.org',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'My amazing Nuxt application',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'The amazing Nuxt application that teaches me all the cool features of Nuxt',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://nuxtjs.org/nuxt-card.png',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://nuxtjs.org/nuxt-card.png',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'NuxtJS',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito&display=swap',
      },
    ],
    script: [
      // { src: 'https://polyfill.io/v3/polyfill.min.js?features=es6%2Ces7%2CArray.from'}
      // { src: 'https://polyfill.io/v3/polyfill.min.js?features=es6'}
    ],
  },

  // plugins config
  plugins: [
    { src: '~/plugins/vue-notification-client', mode: 'client' },
    { src: '~/plugins/vue-notification-server', mode: 'server' },
    // { src: '~/plugins/persistedState.js', ssr: false },
    { src: '~/plugins/persistedState.client' },
    { src: '~/plugins/axios.js', ssr: false },
    // { src: '~/plugins/polyfills', mode: 'server' },
  ],

  /*
   ** Module Config
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/toast'],

  // Axios Config
  axios: {
    // baseURL: process.env.API_BASE_URL,
    // progress: false, // Default true, 로딩 바를 사용하지 않음 false
    // proxy: false,
    proxy: true,
    // retry: {
    //   retries: 4, // 최대 재전송 횟수 4회
    //   shouldResetTimeout: true, // 재전송 간 타임아웃을 리셋하기
    //   retryDelay: (retry) => {
    //     return retry * 100; // 재전송 횟수 * 0.1초만큼 재전송 시작 시간을 지연시키기
    //   },
    //   retryCondition: (error) => err.response.status === 429, // 서버 혼잡이 일어났을 경우에만 재전송하기
    // },
  },
  proxy: {
    '/sample/api': {
      target: process.env.API_BASE_URL,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/': '/',
      },
    },
  },

  // toast config
  toast: {
    position: 'top-center',
    duration: 3000,
  },

  /*
   ** Activate components - https://nuxtjs.org/docs/2.x/directory-structure/components#components-module
   */
  components: true,

  /*
   ** importing a custom loader. this will overwrite the default loader
   */
  loading: '~/components/LoadingBar.vue',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    [
      '@nuxtjs/dotenv',
      { filename: `./config/.env.${process.env.NODE_ENV}`, systemvars: true },
    ],
  ],

  /*
   ** Build configuration
   */
  build: {
    transpile: [],
    // Failed to execute 'appendChild' on 'Node': This node type does not support this method
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true, // 👈 add this line
      },
    },
    // IE11 오류로 추가
    babel: {
      // envName: server, client, modern
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      presets({ envName }) {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      } else {
        // config.module.rules.push({
        //   loader: 'frontmatter-markdown-loader',
        //   options: {
        //     mode: [Mode.VUE_COMPONENT, Mode.META]
        //   }
        // })
      }
    },
  },
  // create extra file for netlify
  generate: {
    dir: '../htdocs',
    fallback: true,
    // subFolders: false
  },
}
