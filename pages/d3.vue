<template>
  <div class="demo">
    <d3-treemap
      :width="860"
      :height="550"
      :data="data"
      :name-fn="nameFn"
      :value-fn="picked === 'size' ? sumBySize : sumByCount"
      :label-fn="labelFn"
      :color-fn="colorFn"
    />
    <input v-model="picked" type="radio" value="size" /><label>Size</label>
    <input v-model="picked" type="radio" value="count" /><label>Count</label>
  </div>
</template>

<script>
import * as d3 from 'd3'
import d3data from '../assets/d3TestData.json'
console.log(d3)

export default {
  components: {
    d3Treemap: d3.treemap,
  },
  data() {
    return { picked: 'size', data: d3data }
  },
  created() {
    this.nameFn = (node) => node.name
    this.labelFn = (node) => node.name.split(/(?=[A-Z][^A-Z])/g)
    const fader = (color) => d3.interpolateRgb(color, '#fff')(0.2)
    this.colorFn = d3.scaleOrdinal(d3.schemePaired.map(fader))
    this.sumBySize = (node) => node.size
    this.sumByCount = function (node) {
      return node.children ? 0 : 1
    }
  },
}
</script>

<style lang="scss" scoped>
.demo >>> {
  svg {
    font: 10px sans-serif;
  }
}
</style>