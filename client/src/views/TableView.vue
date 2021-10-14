<template>
  <div class="table-view bg-white dark:bg-true-gray-900 h-full" ref="tableviewRef">
    <n-data-table
      size="mini"
      :columns="tableColumns"
      :data="tableData"
      :pagination="pagination"
      :max-height="tableMaxHeight"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, h } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { useMessage } from 'naive-ui'

import { execSQL } from '../utils/services'
import { AnyRecord } from '../types'
import { useShortcut } from '../composables/useShortcut'
import { useReplStore } from '../store/repl'

const replStore = useReplStore()
const message = useMessage()

const tableviewRef = ref()
const tableData = ref<AnyRecord[]>([])
const tableColumns = ref<AnyRecord[]>([])
const pagination = ref<AnyRecord>({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100, 200],
  onChange: (page: any) => {
    pagination.value.page = page
  },
  onPageSizeChange: (pageSize: any) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
  },
  prefix (payload: any) {
    return h(
      'div',
      {
        class: 'dark:text-gray-300 absolute left-0',
      },
      {
        default: () => `${payload.itemCount} rows retrieved`
      }
    )
  }
})
const tableMaxHeight = ref(0)

// init the table views without data
const formatTableColumns = (columns: any) => {
  // TODO sorter map with column type
  return columns.map((item: any) => {
    return {
      title: item.column,
      key: item.column,
      sorter: (a: any, b: any) => a[item.column] - b[item.column]
    }
  })
}

const getTableData = async () => {
  const params = encodeURIComponent(replStore.tableInfo.sqlQueries)
  const { data, columns } = await execSQL(params)
  tableData.value = data
  tableColumns.value = formatTableColumns(columns)
  pagination.value.page = 1
}

debouncedWatch(
  () => replStore.tableInfo.manualRun,
  getTableData,
  {
    deep: true,
    debounce: 333
  }
)

useShortcut({
  '⌘+e, ctrl+e': async () => {
    await getTableData()
    message.success('The Queries Runs Successfully!')
  }
})

onMounted(async () => {
  tableMaxHeight.value = tableviewRef.value.offsetHeight - 28
})
</script>
