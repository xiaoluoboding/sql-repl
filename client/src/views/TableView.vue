<template>
  <div class="table-view bg-white dark:bg-true-gray-900 h-full" ref="tableviewRef">
    <n-data-table
      size="mini"
      :columns="columns"
      :data="data"
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
const data = ref<AnyRecord[]>([])
const columns = ref<AnyRecord[]>([])
const pagination = ref<AnyRecord>({
  page: 1,
  pageSize: 20,
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
const formatTableColumns = async () => {
  // TODO sorter map with column type
  columns.value = replStore.tableInfo.tableColumns.map((item: any) => {
    return {
      title: item.column,
      key: item.column,
      sorter: (a: any, b: any) => a[item.column] - b[item.column]
    }
  })
}

const getTableData = async () => {
  const params = encodeURIComponent(replStore.tableInfo.sqlQueries)
  data.value = await execSQL(params)
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
  replStore.databaseInfo.connected = false
  await replStore.connectDatabase()
  await replStore.initTableColumns()
  await formatTableColumns()
  await getTableData()
  tableMaxHeight.value = tableviewRef.value.offsetHeight - 28
})
</script>
