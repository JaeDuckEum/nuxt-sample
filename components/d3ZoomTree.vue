<template>
  <div style="width: 500px; heigth: 500px">
    <svg></svg>
  </div>
</template>

<script>
import DOM from '@observablehq/stdlib/src/dom'
import data from '~/assets/flare-2.json'
const d3 = require('d3')
export default {
  mounted() {
    const vueComponent = this
    // 숫자 형식 포맷
    const format = d3.format(',d')

    /**
     * color
     * scaleOrdianl 뒤에 색깔이 담긴 배열이 들어오면 된다.
     *
     */
    // const color = d3.scaleOrdinal(
    //   d3.quantize(d3.interpolateRainbow, data.children.length + 1)
    // )
    const color = d3.scaleOrdinal([
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#1237bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd12',
      '#17becf',
    ])

    /**
     * 최상단 트리맵
     */
    const name = (d) => {
      return d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join('/')
    }

    function tile(node, x0, y0, x1, y1) {
      d3.treemapBinary(node, 0, 0, width, height)
      for (const child of node.children) {
        child.x0 = x0 + (child.x0 / width) * (x1 - x0)
        child.x1 = x0 + (child.x1 / width) * (x1 - x0)
        child.y0 = y0 + (child.y0 / height) * (y1 - y0)
        child.y1 = y0 + (child.y1 / height) * (y1 - y0)
      }
    }
    const width = 300
    const height = width - 30
    const treemap = (data) =>
      d3.treemap().tile(tile)(
        d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value)
      )
    const x = d3.scaleLinear().rangeRound([0, width])
    const y = d3.scaleLinear().rangeRound([0, height])

    const svg = d3
      .select('svg')
      .attr('viewBox', [0.5, -30.5, width, height + 30])
      .style('font', '10px sans-serif')

    let group = svg.append('g').call(render, treemap(data))

    function render(group, root) {
      const node = group
        .selectAll('g')
        .data(root.children.concat(root))
        .join('g')

      node
        .filter((d) => (d === root ? d.parent : d.children))
        .attr('cursor', 'pointer')
        // .on('click', (event, d) => (d === root ? zoomout(root) : zoomin(d)))
        .on('click', (event, d) => {
          console.log(d)
          if (d === root) zoomout(root)
          else {
            if (d.depth > 1) {
              vueComponent.$store.commit('setFlare', d.data)
              vueComponent.$store.commit('setZoomTree', { status: false })
              vueComponent.$store.commit('setRadialTree', { status: true })
              //   vueComponent.$router.push('/d3ZoomSunburst')
              // vueComponent.$router.push('/d3RadialTree')
            }
            zoomin(d)
          }
        })

      //   node.append('title').text((d) => `${name(d)}\n${format(d.value)}`)

      node
        .append('rect')
        .attr('id', (d) => (d.leafUid = DOM.uid('leaf')).id)
        // .attr('fill', (d) =>
        //   d === root ? '#fff' : d.children ? '#ccc' : '#ddd'
        // )
        .attr('fill', (d) => {
          while (d.depth > 1) d = d.parent
          return color(d.data.name)
        })
        .attr('stroke', '#fff')

      node
        .append('clipPath')
        .attr('id', (d) => (d.clipUid = DOM.uid('clip')).id)
        .append('use')
        .attr('xlink:href', (d) => d.leafUid.href)

      node
        .append('text')
        .attr('clip-path', (d) => d.clipUid)
        .attr('font-weight', (d) => (d === root ? 'bold' : null))
        .selectAll('tspan')
        .data((d) =>
          (d === root ? name(d) : d.data.name)
            .split(/(?=[A-Z][^A-Z])/g)
            .concat(format(d.value))
        )
        .join('tspan')
        .attr('x', 3)
        .attr(
          'y',
          (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
        )
        .attr('fill-opacity', (d, i, nodes) =>
          i === nodes.length - 1 ? 0.7 : null
        )
        .attr('font-weight', (d, i, nodes) =>
          i === nodes.length - 1 ? 'normal' : null
        )
        .text((d) => d)

      group.call(position, root)
    }

    function position(group, root) {
      group
        .selectAll('g')
        .attr('transform', (d) =>
          d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`
        )
        .select('rect')
        .attr('width', (d) => (d === root ? width : x(d.x1) - x(d.x0)))
        .attr('height', (d) => (d === root ? 30 : y(d.y1) - y(d.y0)))
    }

    // When zooming in, draw the new nodes on top, and fade them in.
    function zoomin(d) {
      const group0 = group.attr('pointer-events', 'none')
      const group1 = (group = svg.append('g').call(render, d))

      x.domain([d.x0, d.x1])
      y.domain([d.y0, d.y1])

      svg
        .transition()
        .duration(750)
        .call((t) => group0.transition(t).remove().call(position, d.parent))
        .call((t) =>
          group1
            .transition(t)
            .attrTween('opacity', () => d3.interpolate(0, 1))
            .call(position, d)
        )
    }

    // When zooming out, draw the old nodes on top, and fade them out.
    function zoomout(d) {
      const group0 = group.attr('pointer-events', 'none')
      const group1 = (group = svg.insert('g', '*').call(render, d.parent))

      x.domain([d.parent.x0, d.parent.x1])
      y.domain([d.parent.y0, d.parent.y1])

      svg
        .transition()
        .duration(750)
        .call((t) =>
          group0
            .transition(t)
            .remove()
            .attrTween('opacity', () => d3.interpolate(1, 0))
            .call(position, d)
        )
        .call((t) => group1.transition(t).call(position, d.parent))
    }

    // return svg.node()
  },
  methods: {},
}
</script>

<style>
</style>