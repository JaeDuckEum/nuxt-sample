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
import { createContent, getUserInfo } from '@/api'
import CKEditor4 from '~/components/CKEditor4.vue'
// import CKEditor5 from '~/components/CKEditor5.vue'

export default {
  components: {
    CKEditor4,
    // CKEditor5,
  },
  data() {
    return {
      title: '',
      content: '',
    }
  },
  async created() {
    const res = await getUserInfo()
    if (res.data.isSuccess) {
      this.$router.push({
        path: '/create',
      })
    } else {
      alert('로그인 후 이용해주세요')
      this.$router.push({
        path: '/login',
      })
    }
  },
  methods: {
    async register() {
      await createContent({
        title: this.title,
        content: this.content,
      })
      this.$router.push({
        path: '/board',
      })
    },
  },
}
</script>

<style>
</style>