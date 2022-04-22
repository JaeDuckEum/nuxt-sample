<template>
  <div class="container">
    <input v-model="title" type="text" placeholder="제목" />
    <!-- <CKEditor5 v-model="content"></CKEditor5> -->
    <CKEditor4 v-model="content"></CKEditor4>
    <div>내용</div>
    <div>{{ content }}</div>
    <button @click="register">등록</button>
  </div>
</template>

<script>
import { createContent } from '@/api'
import CKEditor4 from '~/components/CKEditor4.vue'
// import CKEditor5 from '~/components/CKEditor5.vue'

export default {
  components: {
    CKEditor4,
    // CKEditor5,
  },
  // components: { CKEditor },
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    async register() {
      await createContent({
        userId: 2,
        title: this.title,
        content: this.content,
      })
      // .then(
      //   this.$router.push({
      //     path: '/board',
      //   })
      // )
      this.$router.push({
        path: '/board',
      })
    },
  },
}
</script>

<style>
</style>