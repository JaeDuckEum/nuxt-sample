<template>
  <div>
    <h1 class="title">
       Category.vue
    </h1>
    <br>
    <hr>
    <br>
    <!-- <button @click="addNode">Add Node</button> -->
    <button @click="saveCtgry">저 장</button>
    <vue-tree-list
      @delete-node="onDel"
      @add-node="onAddNode"
      :model="treeData"
      default-tree-node-name=""
      default-leaf-node-name=""
      v-bind:default-expanded="true"
    >
      <template v-slot:leafNameDisplay="slotProps">
        <span>
          <input type="text" v-model="slotProps.model.name" placeholder="세부 분류명을 입력해주세요."/>
          <!-- <span class="muted">#{{ slotProps.model.id }}</span> -->
        </span>
      </template>
      <span class="icon" slot="addTreeNodeIcon">추가 </span>
      <span class="icon" slot="addLeafNodeIcon" style="display:none;">요소추가</span>
      <span class="icon" slot="editNodeIcon" style="display:none;">편집</span>
      <span class="icon" slot="delNodeIcon">삭제</span>
      <span class="icon" slot="leafNodeIcon">└</span>
      <span class="icon" slot="treeNodeIcon">└</span>
    </vue-tree-list>
    <br>
    <hr>
    <br>
    <button @click="getNewTree">Get new tree</button>
    <pre>
      {{newTree}}
    </pre>
  </div>
</template>

<script>
import { Tree, TreeNode } from '@/assets/js/plugins/Tree'
import { v1 } from 'uuid';
export default {
  // fetch() {
  //   return this.$axios.$get('/sample/api/category/getCategoryList')
  //   .then((res) => {
  //     this.treeData = new Tree([
  //             {
  //               name: '카테고리',
  //               id: 1,
  //               pid: 0,
  //               dragDisabled: true,
  //               delNodeDisabled: true,
  //               addLeafNodeDisabled: true,
  //               parentId: "",
  //               prptyId: "",
  //               children: res.data
  //             }
  //           ])
  //   })
  // },
  name: 'CategoryPage',
  props: [],
  components: {},
  data () {
    return {
      newTree: {},
      children: [],
      treeData: new Tree([
        {
          name: '카테고리',
          id: 1,
          pid: 0,
          dragDisabled: true,
          delNodeDisabled: true,
          addLeafNodeDisabled: true,
          prptyId: "",
          parentId: "",
          children: []
        }
      ])
    }
  },
  async beforeMount () {
    await this.getCategoryList()
  },
  mounted () {},
  methods: {
      onDel(node) {
        console.log(node)
        node.remove()
      },
      // onChangeName(params) {
      //   console.log(params)
      // },
      onAddNode(params) {
        this.setAddNode(params)
        //console.log(params)
      },
      setAddNode(node) {
        console.log(node)
        const parentNode = node.parent;
        node.prptyId = v1()
        node.parenId = parentNode.prptyId
        // node.value = node.name
        node.dragDisabled = true
        console.log(node)
      },
      // onClick(params) {
      //   console.log(params)
      // },
      addNode() {
        var node = new TreeNode({ name: 'new node', isLeaf: false })
        if (!this.treeData.children) this.treeData.children = []
        this.treeData.addChildren(node)
      },
      getNewTree() {
        var vm = this
        function _dfs(oldNode) {
          var newNode = {}
          for (var k in oldNode) {
            if (k !== 'children' && k !== 'parent') {
              newNode[k] = oldNode[k]
            }
          }
          if (oldNode.children && oldNode.children.length > 0) {
            newNode.children = []
            for (var i = 0, len = oldNode.children.length; i < len; i++) {
              newNode.children.push(_dfs(oldNode.children[i]))
            }
          }
          return newNode
        }
        vm.newTree = _dfs(vm.treeData)
      },
      resetTreeData() {
        console.log(this.treeData) 
        console.log(this.treeData.children[0])
        console.log(JSON.parse(this.treeData.children[0]))
      },
      getCategoryList() {
        return this.$axios.get('/sample/api/category/getCategoryList').then((res) => {
          if(res.status === 200) {
            console.log(res.data)
            this.treeData = new Tree([
              {
                name: '카테고리',
                id: 1,
                pid: 0,
                dragDisabled: true,
                delNodeDisabled: true,
                addLeafNodeDisabled: true,
                parentId: "",
                prptyId: "",
                children: res.data
              }
            ])
          } else {
            alert('fail')
          }
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response)
        })
      },
      saveCtgry() {
        this.resetTreeData()

        let params = JSON.parse(this.treeData.children[0])
        this.$axios.post('/sample/api/category/save', params).then((res) => {
          console.log(res);
          if(res.status === 200) {
            alert('성공적으로 저장되었습니다.')
          } else {
            alert('에러가 발생했습니다.')
          }
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response)
        })
      }
  },
  watch: {},
  computed: {}
}
</script>

<style scoped>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 48px;
  color: #35495e;
  letter-spacing: 1px;
}
.vtl .vtl-drag-disabled {
  background-color: #d0cfcf;
}
.vtl .vtl-drag-disabled:hover {
   background-color: #d0cfcf;
}
.vtl .vtl-disabled {
  background-color: #d0cfcf;
}
.icon:hover {
  cursor: pointer;
}
.muted {
  color: gray;
  font-size: 80%;
}
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>


