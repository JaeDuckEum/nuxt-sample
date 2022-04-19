<template>
  <div>
    <p>Axios Exception Sample</p>
    <div>
      <select
        v-model="exceptionType">
        <option
          v-for="item in exceptionTypeList" :key="item.code" :value="item.code"
        >
          {{ item.codeName }}
        </option>
      </select>
      &nbsp;
      <select
        v-model="deleteYn">
        <option
          v-for="item in deleteYnList" :key="item.code" :value="item.code"
        >
          {{ item.codeName }}
        </option>
      </select>
      &nbsp;
      <button @click.prevent="exception">exception</button>
    </div>
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
</template>

<script>
export default {
  name: "sample-exception",
  data() {
    return {
      exceptionTypeList : [
        {"code": "", codeName: '== 전체 =='},
        {"code": "BVEX", codeName: 'BoardViewException'},
        {"code": "BLEX", codeName: 'BoardListException'},
        {"code": "EX", codeName: 'Exception'},
        {"code": "ADEX", codeName: 'AccessDeniedException'},
        {"code": "AUEX", codeName: 'AuthException'},
      ],
      deleteYnList : [
        {"code": "", codeName: '== 전체 =='},
        {"code": "Y", codeName: '삭제'},
        {"code": "N", codeName: '미삭제'},
      ],
      exceptionType : '',
      deleteYn : '',
      boardList : null,
    }
  },
  mounted() {
    console.log('mounted is start')
    //this.exception()
    console.log('mounted is end')
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 100)
    })
  },
  methods: {
    exception() {
      this.boardList = null
      const exceptionType = this.exceptionType
      console.log('exception_exceptionType : ', exceptionType)
      if ( exceptionType === 'BVEX' || exceptionType === 'BLEX' ) {
        console.log('this.getBoardExcepton() is start')
        this.getBoardExcepton()
      } else if ( exceptionType === 'EX' || exceptionType === 'ADEX' ) {
        this.$axios.setLoading(false)
        this.getException()
      } else if ( exceptionType === 'AUEX' ) {
        this.getAuthException()
      } else {
        console.log('this.getBoardList() is start')
        this.getBoardList()
      }
    },
    async getBoardExcepton() {
      this.$nuxt.$loading.start()
      const exceptionType = this.exceptionType
      const deleteYn = this.deleteYn

      let sUrl = '/sample/api/board/exception'

      let params = {};
      params.exceptionType = exceptionType
      params.searchDeleteYn = deleteYn
      console.log('params : ', params)
      await this.$axios.$post(sUrl, params)
        .then(res => {
          console.log('res : ', res)
          const data = res.data
          this.boardList = res.data
          this.$nuxt.$loading.finish()
        })
        .catch(e => {
          console.log('e : ', e)
          this.$nuxt.$loading.finish()
        })

      console.log('getBoardList is end ')
      console.log('this.boardList : ', this.boardList)
    },
    async getException() {
      const exceptionType = this.exceptionType
      const deleteYn = this.deleteYn

      let sUrl
      if ( exceptionType === 'EX' ) {
        sUrl = '/sample/api/board/list/exception'
      } else if ( exceptionType === 'ADEX' ) {
        sUrl = '/sample/api/board/list/accessDeniedException'
      }

      let params = {};
      params.exceptionType = exceptionType
      params.searchDeleteYn = deleteYn
      console.log('params : ', params)
      await this.$axios.$post(sUrl, params)
        .then(res => {
          console.log('res : ', res)
          const data = res.data
          this.boardList = res.data
        })
        .catch(e => {
          console.log('e : ', e)
        })

      console.log('getBoardList is end ')
      console.log('this.boardList : ', this.boardList)
    },
    async getAuthException() {
      const username = "admin"
      const password = "admin123"

      let params = {}
      params.username = username
      params.password = password
      console.log('params : ', params)
      await this.$axios.$post('/sample/api/authenticate', params)
        .then(res => {
          console.log('res : ', res)
          const data = res.data
        })
        .catch(e => {
          console.log('e : ', e)
        })
    },
    async getBoardList() {
      const exceptionType = this.exceptionType
      const deleteYn = this.deleteYn

      let params = {};
      params.exceptionType = exceptionType
      params.searchDeleteYn = deleteYn
      console.log('params : ', params)

      const sUrl = '/sample/api/board/list'

      await this.$axios.$post(sUrl, params)
        .then(res => {
          console.log('res : ', res)
          const data = res.data
          this.boardList = res.data
        })
        .catch(e => {
          console.log('e : ', e)
        })
      console.log('this.boardList : ', this.boardList)
    },
  }
}
</script>