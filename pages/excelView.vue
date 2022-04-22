<template>
  <div id="app">
    <input type="file" @change="chooseFile" />
    <client-only>
      <excel-viewer
        ref="excelViewer"
        :height="1000"
        :first-row-num="firstRowNum"
        :min-col-counts="5"
        :max-col-counts="5"
      />
      <!-- @on-reach-top="reachTop"
        @on-reach-bottom="reachBottom"
        @on-row-select="onRowSelect"
        @on-col-select="onColSelect"
        @on-cell-select="onCellSelect"
        @on-before-open="beforeOpen"
        @on-after-open="afterOpen" -->
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      firstRowNum: 2,
    }
  },
  methods: {
    chooseFile(e) {
      console.info('excel file select', e)
      this.$refs.excelViewer.openExcelFile(e.target.files[0])
    },
    beforeOpen() {
      console.info('excel before open')
    },
    afterOpen() {
      console.info('excel after open')
      //   this.$refs.excelViewer.setRowBackgroundColor(5, 'red')
    },
    onRowSelect(rowNum, selectRowValues) {
      console.info('row select', rowNum, selectRowValues)
      //   this.$refs.excelViewer.setSelectedBackgroundColor('red')
    },
    onColSelect(colNum) {
      console.info('col select', colNum)
    },
    onCellSelect(rowNum, colNum, value) {
      //   this.$refs.excelViewer.setCellBackgroundColor(rowNum, colNum, 'red')
      this.$refs.excelViewer.freezeCellAt(rowNum, colNum)
      if (value) {
        console.info('cell select', rowNum, colNum, value)
      } else {
        console.info('cell select， value empty', rowNum, colNum)
      }
    },
    reachTop() {
      console.info('touch top')
    },
    reachBottom() {
      console.info('touch bottom')
    },
  },
}
</script>
<style src="../node_modules/@uublue/vue-excel-viewer/lib/vue-excel-viewer.css">
</style>