<template>
  <div>
    <p>Axios Post sample</p>
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
    <button @click.prevent="getBoardList">Board List</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boardList : null,
    }
  },
  mounted() {
    console.log('mounted is start')
    this.getBoardList()
    console.log('mounted is end')
  },
  methods: {
    async getBoardList() {
      console.log('getBoardList is start')
      let params = {};
      //params.searchDeleteYn = 'N'
      await this.$axios.$post('/sample/api/board/list', params)
        .then(res => {
          console.log('res : ', res)
          let result, errorMessage, data
          if (res) {
            result = res.result
            errorMessage = res.errorMessage
            data = res.data
          }
          console.log('result : ', result)
          console.log('errorMessage : ', errorMessage)
          console.log('data : ', data)
          this.boardList = data
        })
        .catch(e => {
          console.log('e : ', e)
        })
      //this.boardList = res.data
      //console.log('getBoardList is end : ', res)
      console.log('this.boardList : ', this.boardList)
    }
  }
}
</script>