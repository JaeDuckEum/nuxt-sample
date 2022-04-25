<template>
  <div>
    <button type="button" class="btn btn-primary" @click="showToast">Show Toast</button>
  </div>
</template>

<script>
export default {
  name: 'ToastPage',
  methods: {
    showToast() {
      this.$toast.show('Hello from Toast')
    }
  }
}
</script>