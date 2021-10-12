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
import { h, ref, onMounted } from 'vue'
import { NButton } from 'naive-ui'

import { getTableColumns } from '../utils/services'
import { AnyRecord } from '../types'

const treeData = ref<AnyRecord[]>([])

// init the table views without data
const initTableColumns = async (tableName: string) => {
  const params = encodeURIComponent(`select * from ${tableName}`)
  const tableColumns = await getTableColumns(params)

  return tableColumns.map((item: any) => {
    return {
      label: item.name,
      key: item.column,
      suffix: () => h(
        NButton,
        { text: true },
        { default: () => item.type }
      )
    }
  })
}

onMounted(async () => {
  const tableName = 'employees'
  const tableColumns = await initTableColumns(tableName)
  treeData.value = [{
    label: tableName,
    children: tableColumns
  }]
})
</script>
