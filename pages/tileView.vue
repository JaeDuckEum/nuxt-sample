<template>
  <div>
    <d3ZoomTree v-if="$store.state.zoomTree.status"></d3ZoomTree>
    <d3RadialTree v-if="$store.state.radialTree.status"></d3RadialTree>
  </div>
</template>

<script>
import d3ZoomTree from '~/components/d3ZoomTree.vue'
// import d3RadialTree from '~/components/d3RadialTree.vue'
export default {
  components: { d3ZoomTree },
}
</script>

<style>
</style>