<template>
  <div>
    <p>Loading Exception Sample</p>
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
      <button @click.prevent="getBoardList">Search</button>
      <nuxt-link
        :to="{
          path: '/ejd/loading/loading-ssr',
          params: { loadingType: 'VIEW' },
        }"
      >
        Loading SSR Sample
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
  name: 'LoadingSample',
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
