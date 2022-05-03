<template>
  <svg ref="line"></svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  data() {
    return {
      data: [90, 72, 75, 25, 10, 92],
    }
  },
  computed: {
    line() {
      return d3
        .line()
        .x((d, i) => this.xScale(i))
        .y((d) => this.ySclae(d))
    },
    xScale() {
      return d3
        .scaleLinear()
        .range([20, 480])
        .domain(d3.extent(this.data, (d, i) => i))
    },
    ySclae() {
      return d3.scaleLinear().range([280, 20]).domain([0, 100])
    },
  },
  mounted() {
    const svg = d3
      .select(this.$refs.line)
      .attr('width', 500)
      .attr('height', 300)

    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#76BF8A')
      .attr('stroke-width', 3)
      .attr('d', this.line)
  },
}
</script>

<style>
</style>