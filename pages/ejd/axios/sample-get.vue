<template>
  <div>
    <p>Axios Sample GET</p>
    <p>응답결과 : {{ data }}</p>
    <button @click.prevent="getMessage">Message</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: null,
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    async getMessage() {
      console.log('getMessage is start')
      const res = await this.$axios.$get('/sample/api/message')
        .catch((e) => {
          console.log('e : ', e)
        })
      this.data = res.data
    },
  },
}
</script>
