<template>
  <div>
    <p>Axios Post sample</p>
    <p>Board List</p>
    <ul>
      <li v-for="board in boardList" :key="board.boardSeq">
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
      boardList: null,
    }
  },
  mounted() {
    this.getBoardList()
  },
  methods: {
    async getBoardList() {
      const params = {}
      // params.searchDeleteYn = 'N'
      await this.$axios
        .$post('/sample/api/board/list', params)
        .then((res) => {
          const data = res.data
          this.boardList = data
        })
        .catch((e) => {
          console.log('e : ', e)
        })
    },
  },
}
</script>
