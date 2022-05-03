const d3 = require('d3')
export const graphComp = {
  data: '',
  svg: null,
  svgG: null,
  zoom: null,
  init() {},
  makeGraph(data) {
    this.data = data

    const DataColorArr = [
      '#4480df',
      '#009ee4',
      '#5460dc',
      '#0084b5',
      '#00a2a8',
      '#029174',
      '#1cb86f',
      '#cf8c16',
      '#dc67ab',
      '#dc6967',
    ]

    let colorNum = 0

    const width = 1200
    const height = 850

    const diameter = height * 0.25
    const radius = diameter / 2 // 줌

    const tree = d3
      .tree()
      .size([2 * Math.PI, radius])
      .separation(function (a, b) {
        return (a.parent === b.parent ? 1 : 2) / a.depth
      })

    const root = d3.hierarchy(this.data)

    const treeData = tree(root)

    const nodes = treeData.descendants()
    const links = treeData.links()

    nodes.forEach(function (d) {
      if (d.depth != null) {
        d.y = d.depth * 200
      }
      // if (d.depth === 1) {
      //   d.y = 170
      // } else if (d.depth === 2) {
      //   d.y = 450
      // } else if (d.depth === 3) {
      //   d.y = 650
      // }

      d.rotate = (d.x * 180) / Math.PI - 90
      d.translate = d.y
    })
    //		 		console.log(nodes);

    this.svg = d3
      .select('#svg-container')
      .append('svg')
      .attr('id', 'svgGraph')
      .attr('width', width)
      .attr('height', height)

    this.svgG = this.svg
      .append('g')
      .attr('id', 'layout_zoom')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    /* 링크 생성 */
    this.svgG
      .selectAll('.link')
      .data(links)
      .join('line')
      .attr('class', 'link')
      .attr(
        'd',
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y)
      )

    const node = this.svgG
      .selectAll('.gnode')
      .data(nodes)
      .join('g')
      .attr('class', 'gnode')
      .on('click', this.nodeClick)
      .attr('transform', function (d) {
        return 'rotate(' + d.rotate + ')translate(' + d.translate + ', 0)'
      })

    /* 노드 크기 설정 및 색깔 설정 */
    node
      .append('circle')
      .attr('r', function (d) {
        if (d.depth === 0) {
          return 60
        } else if (d.depth === 1) {
          return 30
        } else {
          return 7
        }
      })
      .attr('class', function (d) {
        if (d.depth === 0) {
          return 'node cate1'
        } else if (d.depth === 1) {
          return 'node cate2'
        } else {
          return 'node cate3'
        }
      })
      .style('fill', function (d) {
        if (d.depth === 0) {
          return 'rgb(6, 65, 159)'
        } else if (d.depth === 1) {
          colorNum++
          d.color = DataColorArr[colorNum % 10]
          return d.color
        } else {
          return d.parent.color
          // return 'rgb(7, 137, 185)'
        }
      })

    node
      .append('text')
      .attr('class', function (d) {
        if (d.depth === 0) {
          return 'text cate1 '
        } else if (d.depth === 1) {
          return 'text cate2 '
        } else {
          return 'text cate3 '
        }
      })
      .attr('dx', function (d) {
        if (d.depth === 0 || d.depth === 1) {
          return '0'
        }
        return d.x < Math.PI ? 12 : -12
      })
      .attr('dy', function (d) {
        if (d.depth === 0 || d.depth === 1) {
          return '0'
        }
        return '.31em'
      })
      .attr('text-anchor', function (d) {
        if (d.depth === 0 || d.depth === 1) {
          return 'middle'
        }
        return d.x < Math.PI ? 'start' : 'end'
      })
      .attr('transform', function (d) {
        if (d.depth === 0 || d.depth === 1) {
          return 'rotate(' + -d.rotate + ')'
        }
        return d.x < Math.PI ? null : 'rotate(180)'
      })
      .text(function (d) {
        if (d.depth === 0 || d.depth === 1) {
          return d.data.name.length > 6
            ? d.data.name.substring(0, 5) + '...'
            : d.data.name
        }
        return d.data.name
      })

    node
      .append('text')
      .attr('class', function (d) {
        if (d.depth === 0) {
          return 'text cate1 '
        } else if (d.depth === 1) {
          return 'text cate2 '
        } else {
          return 'text cate3 '
        }
      })
      .attr('dy', '25')
      .attr('text-anchor', function (d) {
        return 'middle'
      })
      .attr('transform', function (d) {
        if (d.depth === 0 || d.depth === 1) {
          return 'rotate(' + -d.rotate + ')'
        }
        return d.x < Math.PI ? null : 'rotate(180)'
      })
      .text(function (d) {
        return d.data.length
      })

    node.on('mouseenter', (e) => {
      // console.log(e)
      const a = document.querySelector('#layout_zoom')
      a.appendChild(e.target)
    })

    this.zoom = d3
      .zoom()
      .scaleExtent([0.5, 3])
      .translateExtent([
        [-1200, -1000],
        [1200, 1000],
      ])
      .on('zoom', (event) => {
        graphComp.svgG.attr('transform', event.transform)
      })
    this.svg.transition().call(this.zoom.translateTo, 0, 0)
    this.svg.call(this.zoom)
    // this.zoomRefresh()

    this.linkLineConvert()
  },
  linkLineConvert() {
    document.querySelectorAll('.link').forEach((link) => {
      let attrD = link.getAttribute('d')
      if (attrD == null) return
      attrD = attrD.split(',')

      let x1 = attrD[0].split('.')[0]
      let y1 = attrD[1].split('.')[0]
      const x2 = attrD[5].split('.')[0]
      const y2 = attrD[6].split('.')[0]

      x1 = x1.replace('M', '').indexOf('0') === 0 ? '0' : x1.replace('M', '')
      y1 = y1.indexOf('0') === 0 ? '0' : y1

      if (y1.includes('C')) {
        x1 = '0'
        y1 = y1.split('C')[0]
      }
      link.setAttribute('x1', x1)
      link.setAttribute('y1', y1)
      link.setAttribute('x2', x2)
      link.setAttribute('y2', y2)
      link.removeAttribute('d')
    })
  },
  nodeClick(d) {
    // $('#div_pop').hide()
    // $('#div_pop').empty()
    // if (d.data.data_id == null || d.data.data_id === '') return false
    // $.ajax({
    //   type: 'POST',
    //   url: '/visualweb/indexVisualizationListAction.do',
    //   data: {
    //     data_id: d.data.data_id,
    //   },
    //   success(data) {
    //     $('#div_pop').html(data)
    //     $('#div_pop').show()
    //   },
    //   error(xhr, status, error) {
    //     alert('에러발생')
    //   },
    // })
  },
  zoomIn() {
    this.zoom.scaleBy(this.svg.transition().duration(0), 1.2)
  },
  zoomOut() {
    this.zoom.scaleBy(this.svg.transition().duration(0), 0.8)
  },
  zoomRefresh() {
    this.zoom.scaleTo(this.svg.transition().duration(0), 1.0)
    // 				this.svg.transition().call(this.zoom.translateTo, 0, 0);
  },
}
