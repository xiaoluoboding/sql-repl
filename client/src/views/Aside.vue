<template>
  <aside class="aside-menu bg-white dark:bg-true-gray-900 h-full relative">
    <div class="aside-menu--tablecols p-4" v-if="treeData && treeData.length > 0">
      <NTree
        default-expand-all
        block-line
        :data="treeData"
      />
    </div>
    <div class="aside-menu--actions p-4 absolute left-0 bottom-0 w-full">
      <n-button ghost class="w-full">
        {{$t('button.create_connection')}}
      </n-button>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { h, ref, watch, nextTick } from 'vue'

import { AnyRecord } from '../types'
import { useReplStore } from '../store/repl'

const treeData = ref<AnyRecord[]>([])
const store = useReplStore()

// init the table views without data
const initTableColumns = () => {
  return store.tableInfo.tableColumns.map((item: any) => {
    return {
      label: item.name,
      key: item.column,
      suffix: () => h(
        'div',
        {},
        { default: () => item.type }
      )
    }
  })
}

watch(
  () => store.tableInfo.tableColumns,
  () => {
  const tableName = store.tableInfo.activeTable
  const tableColumns = initTableColumns()
  
  nextTick(() => {
    treeData.value = [{
      label: tableName,
      children: tableColumns
    }]
  })
})
</script>
