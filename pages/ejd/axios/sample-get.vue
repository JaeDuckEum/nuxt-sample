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
      data : null,
    }
  },
  mounted() {
    console.log('mounted is start')

    this.getMessage()
    console.log('mounted is end')
  },
  methods: {
    async getMessage() {
      console.log('getMessage is start')
      const res = await this.$axios.$get('/sample/api/message')
        .catch(e => {
          console.log('e : ', e)
        })
      this.data = res.data
      console.log('getMessage is end : ', res)
    }
  }
}
</script>