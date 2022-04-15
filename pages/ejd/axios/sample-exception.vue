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
      <button @click.prevent="getException">Board List</button>
    </div>
    <p>Board List</p>
    <ul>
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
    this.getException()
    console.log('mounted is end')
  },
  methods: {
    getException() {
      const exceptionType = this.exceptionType
      if ( exceptionType === 'EX' || exceptionType === 'ADEX' ) {
        this.getBoardListException();
      } else if ( exceptionType === 'AUEX' ) {
        this.getAuthException();
      }
    },
    async getBoardListException() {
      console.log('getBoardList is start')
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
          let result, errorMessage, data
          if (res) {
            result = res.result
            errorMessage = res.errorMessage
            data = res.data
          } else {
            alert('에러입니다.')
            return
          }
          if ( !data ) {
            alert('에러입니다.')
            return
          }
          console.log('result : ', result)
          console.log('errorMessage : ', errorMessage)
          console.log('data : ', data)
          this.boardList = data
        })
        .catch(e => {
          console.log('e : ', e)
        })

      console.log('getBoardList is end ')
      console.log('this.boardList : ', this.boardList)
    },
    async getAuthException() {
      const username = ""
      const password = ""

      let params = {}
      params.username = username
      params.password = password
      console.log('params : ', params)
      await this.$axios.$post('/sample/api/authenticate', params)
        .then(res => {
          console.log('res : ', res)
          let result, errorMessage, data
          if (res) {
            result = res.result
            errorMessage = res.errorMessage
            data = res.data
          } else {
            alert('에러입니다.')
            return
          }
          if ( !data ) {
            alert('에러입니다.')
            return
          }
          console.log('result : ', result)
          console.log('errorMessage : ', errorMessage)
          console.log('data : ', data)
          this.boardList = data
        })
        .catch(e => {
          console.log('e : ', e)
        })
    }
  }
}
</script>