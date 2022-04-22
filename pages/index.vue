<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  fetch({ redirect }) {
    console.log('fetch')
    redirect('/board')
  },
}
</script>
