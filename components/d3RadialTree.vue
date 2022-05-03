<template>
  <div class="visual-map-wrap">
    <div id="div_inner" class="inner">
      <div class="map-control">
        <div class="btn-control-group">
          <!-- 							<button type="button" class="mu-btn-sm mu-btn-icon-only mu-btn-bg-non" title="화면에 맞춤"> -->
          <!-- 								<i class="mu-icon-svg zoom-full"></i><span>화면에 맞춤</span> -->
          <!-- 							</button> -->
          <button
            id="zoom-in"
            type="button"
            class="mu-btn-sm mu-btn-icon-only mu-btn-bg-non"
            title="확대"
            @click="zoomIn"
          >
            <i class="mu-icon-svg zoom-in"></i><span>확대</span>
          </button>
          <button
            id="zoom-out"
            type="button"
            class="mu-btn-sm mu-btn-icon-only mu-btn-bg-non"
            title="축소"
            @click="zoomOut"
          >
            <i class="mu-icon-svg zoom-out"></i><span>축소</span>
          </button>
          <button
            id="zoom-refresh"
            type="button"
            class="mu-btn-sm mu-btn-icon-only mu-btn-bg-non"
            title="초기화"
            @click="zoomRefresh"
          >
            <i class="mu-icon-svg zoom-refresh"></i><span>초기화</span>
          </button>
        </div>
      </div>
      <div id="svg-container" class="svg-container">
        <!-- <svg
          id="treemap_area"
          class="treemap"
          width="100%"
          height="100%"
          viewBox="0,0,1200,675"
        >
          <g></g>
        </svg> -->
      </div>
      <div id="div_pop" class="doc-layer" style="margin-right: 0"></div>
      <div id="div_tooltip" class="toolTip"></div>
    </div>
  </div>
</template>

<script>
import { graphComp } from '~/util/d3RadialTree'
export default {
  mounted() {
    const data = this.$store.state.flare
    graphComp.makeGraph(data)
  },
  methods: {
    zoomIn() {
      graphComp.zoomIn()
    },
    zoomOut() {
      graphComp.zoomOut()
    },
    zoomRefresh() {
      graphComp.zoomRefresh()
    },
  },
}
</script>

<style>
.link {
  stroke: lightgrey;
  stroke-width: 1.5px;
}

.cate1 {
  fill: white;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
}

.cate2 {
  fill: white;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
}

.cate3,
.cate4 {
  text-shadow: 1px 1px white;
  color: #666;
  font-size: 13px;
}

.cate3:hover,
.cate4:hover {
  font-size: calc(14px * 1.5);
  font-weight: 500;
  opacity: 1;
  transition: all 0.2s;
  text-shadow: 0 2px 3px white;
  cursor: pointer;
}

.map-control {
  position: absolute;
  right: 20px;
  top: 20px px;
  display: flex;
  z-index: 1;
}

.svg-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.inner {
  position: relative;
  width: 1210px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #cecece;
  border-radius: 5px;
  margin-top: 20px;
}
</style>