<template>
  <div>
    <p>Loading Exception Sample</p>
    <div>
      <span>로딩 구분 : </span>
      <select
        v-model="loadingType">
        <option
          v-for="item in loadingTypeList" :key="item.code" :value="item.code"
        >
          {{ item.codeName }}
        </option>
      </select>
      &nbsp;
      <button @click.prevent="getBoardList">Board List</button>
    </div>
    <div>
      <p>Board List</p>
      <ul>
        <li v-if="!boardList">
          <p>조회 데이터가 없습니다.</p>
        </li>
        <li
          v-for="board in boardList" :key="board.boardSeq"
        >
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
  name: "loading-ssr-sample",
  async asyncData({ $axios, app, store, route, params, query, env, isDev, isHMR, redirect, $http, error, $config}) {
    console.log('asyncData is start')
    console.log('$axios : ', $axios)
    console.log('app : ', app)
    console.log('app.$axios : ', app.$axios)
    console.log('store : ', store)
    console.log('route : ', route)
    console.log('params : ', params)
    console.log('query : ', query)
    console.log('env : ', env)
    console.log('isDev : ', isDev)
    console.log('isHMR : ', isHMR)
    console.log('redirect : ', redirect)
    console.log('$http : ', $http)
    console.log('error : ', error)
    console.log('$config : ', $config)

    try {
      // const response = await $axios.get(`/users/${params.id}`);
      // const user = response.data;
      // return { user }

      let boardList
      await app.$axios.post('/sample/api/board/list', params)
        .then(res => {
          console.log('res : ', res)
          console.log('res.data : ', res.data)
          boardList = res.data.data
        })
        .catch(e => {
          console.log('e : ', e)
        })
        .finally(() => {
        })

      return { boardList }
    } catch(e) {
      console.log('asyncData error : ', e)
      // error({ statusCode: 503, message: 'API 요청이 실패했습니다 다시 시도해 주세요' })
    }

    console.log('asyncData is end')
  },
  data() {
    return {
      loadingTypeList : [
        {code: 'COMM', codeName: '공통처리'},
        {code: 'VIEW', codeName: '화면처리'},
        {code: 'N', codeName: '로딩안함'},
      ],
      loadingType : 'COMM',
      boardList : null,
    }
  },
  mounted() {
    console.log('mounted is start')
    //this.getBoardList()
    console.log('mounted is end')
  },
  methods: {
    async getBoardList() {
      let params = {};

      if ( this.loadingType === 'VIEW' ) {
        this.$axios.setLoading(false)
        this.$nuxt.$loading.start()
      } else if ( this.loadingType === 'N' ) {
        this.$axios.setLoading(false)
      }

      await this.$axios.$post('/sample/api/board/list', params)
        .then(res => {
          console.log('res : ', res)
          let result, errorMessage, data
          data = res.data
          this.boardList = data
        })
        .catch(e => {
          console.log('e : ', e)
        })
        .finally(() => {
          if ( this.loadingType === 'VIEW' ) {
            this.$nuxt.$loading.finish()
          }
        })
    }
  }
}
</script>