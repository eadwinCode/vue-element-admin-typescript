<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { dummyData } from './dummydata'
import { ElTree } from 'element-ui/types/tree';

@Component({

})
export default class Tree extends Vue {
    private  filterText: string = ''
    private data2:Array<any> = dummyData

    private defaultProps = {
        children: 'children',
        label: 'label'
    }

    @Watch('filterText')
    onfilterChanged(val: string){
        (this.$refs.tree2 as ElTree<any,any>).filter(val)
    }

    filterNode(value: any, data: any) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
}
</script>

<style>

</style>