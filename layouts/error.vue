<template>
  <div class="container">
    <div class="error">
      <p v-if="error.statusCode === 404">
        404<br />
        Page not found
      </p>
      <p v-else>An error occurred</p>
      <p>
        <nuxt-link to="/">Home page</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'default',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
}
</script>

<style scoped>
.error {
  text-align: center;
  color: #a9a7ba;
  font-size: 32px;
  font-weight: bold;
}
</style>
