<template>
  <div>
    <div v-if="loading" class="black_background"></div>
    <div v-if="loading" class="loading-page">
      <div class="loading"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
<style scoped>
.black_background {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: #666666;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=60);
}
.loading-page {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1002;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.loading {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border: 4px solid rgba(9, 133, 81, 0.705);
  border-radius: 50%;
  border-top-color: #158876;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
