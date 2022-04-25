<template>
  <div>
    <p>Loading SSR Sample</p>
    <div>
      <span>로딩 구분 : </span>
      <select v-model="loadingType">
        <option
          v-for="item in loadingTypeList"
          :key="item.code"
          :value="item.code"
        >
          {{ item.codeName }}
        </option>
      </select>
      &nbsp;
      <button @click.prevent="serarch">Search</button>
      <nuxt-link
        :to="{
          path: '/ejd/loading/loading',
          params: { loadingType: loadingType },
          query: { loadingType: loadingType },
        }"
      >
        Loading Sample
      </nuxt-link>
      &nbsp;
      <nuxt-link
        :to="{
          name: 'products-edit-product_id',
          params: { product_id: 50 },
          query: { loadingType: loadingType },
        }"
      >
        Editing Product
      </nuxt-link>
    </div>
    <div>
      <p>Board List</p>
      <ul>
        <li v-if="!boardList">
          <p>조회 데이터가 없습니다.</p>
        </li>
        <li v-for="board in boardList" :key="board.boardSeq">
          <p>boardSeq : {{ board.boardSeq }}</p>
          <p>제목 : {{ board.title }}</p>
          <p>내용 : {{ board.cntnts }}</p>
          <p>삭제여부 : {{ board.deleteYn }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSsrSample',
  async asyncData({
    $axios,
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    $http,
    error,
    $config,
  }) {
    // console.log('asyncData is start')
    // console.log('$axios : ', $axios)
    // console.log('app : ', app)
    // console.log('app.$axios : ', app.$axios)
    // console.log('app.data : ', app.data.loadingType)
    // console.log('store : ', store)
    // console.log('route : ', route)
    // console.log('params : ', params)
    // console.log('query : ', query)
    // console.log('env : ', env)
    // console.log('isDev : ', isDev)
    // console.log('isHMR : ', isHMR)
    // console.log('redirect : ', redirect)
    // console.log('$http : ', $http)
    // console.log('error : ', error)
    // console.log('$config : ', $config)

    try {
      let boardList
      await app.$axios
        .post('/sample/api/board/list', params)
        .then((res) => {
          boardList = res.data.data
        })
        .catch((e) => {
          console.log('e : ', e)
        })
        .finally(() => {})

      return { boardList }
    } catch (e) {
      console.log('asyncData error : ', e)
      // error({ statusCode: 503, message: 'API 요청이 실패했습니다 다시 시도해 주세요' })
    }
  },
  data() {
    return {
      loadingTypeList: [
        { code: 'COMM', codeName: '공통처리' },
        { code: 'VIEW', codeName: '화면처리' },
        { code: 'N', codeName: '로딩안함' },
      ],
      loadingType: 'COMM',
      boardList: null,
    }
  },
  mounted() {
    this.getBoardList()
  },
  methods: {
    serarch() {
      this.getBoardList()
      // this.$router.push({ name: 'products-edit-product_id', params: { product_id: 100 } })
    },
    async getBoardList() {
      const params = {}

      if (this.loadingType === 'VIEW') {
        this.$axios.setLoading(false)
        this.$nuxt.$loading.start()
      } else if (this.loadingType === 'N') {
        this.$axios.setLoading(false)
      }

      await this.$axios
        .$post('/sample/api/board/list', params)
        .then((res) => {
          console.log('res : ', res)
          const data = res.data
          this.boardList = data
        })
        .catch((e) => {
          console.log('e : ', e)
        })
        .finally(() => {
          if (this.loadingType === 'VIEW') {
            this.$nuxt.$loading.finish()
          }
        })
    },
  },
}
</script>
