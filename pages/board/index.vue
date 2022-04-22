<template>
  <div>
    <b-table
      striped
      hover
      :fields="fields"
      :items="items"
      @row-clicked="goBoardDetail"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
    <b-button variant="success" @click="createContent">글쓰기</b-button>
  </div>
</template>

<script>
import { getContents } from '@/api'
export default {
  async asyncData() {
    console.log('asyncData')
    const { data } = await getContents()
    return { items: data.result }
  },
  data() {
    return {
      fields: [
        { key: 'index', label: '글번호' },
        { key: 'title', label: '글제목', sortable: true },
        { key: 'nickname', label: '작성자', sortable: true },
        { key: 'createdAt', label: '작성일', sortable: true },
      ],
      items: [],
    }
  },
  methods: {
    createContent() {
      this.$router.push({
        path: '/create',
      })
    },
    goBoardDetail(item, index, e) {
      this.$router.push({
        path: `/board/${item.contentId}`,
      })
    },
  },
}
</script>

<style>
</style>