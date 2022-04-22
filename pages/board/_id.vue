<template>
  <div>
    <h1>제목</h1>
    <div>{{ result.title }}</div>
    <h1>작성자</h1>
    <div>{{ result.nickname }}</div>
    <h1>글내용</h1>
    <div class="ck-content" v-html="result.content"></div>
  </div>
</template>

<script>
import { getContent } from '@/api'
export default {
  async asyncData({ route }) {
    const { data } = await getContent({ contentId: route.params.id })
    const result = data.result
    return { result }
  },
}
</script>

<style>
</style>