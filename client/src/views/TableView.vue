<template>
  <div class="table-view bg-white dark:bg-true-gray-900 h-full" ref="tableviewRef">
    <!-- 数据连接 -->
    <!-- <n-button text icon-placement="left" class="">
      <template #icon>
        <carbon-data-collection class="h-5 w-5" />
      </template>
      数据连接
    </n-button> -->
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
import { ref, computed, onMounted } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { useNotification } from 'naive-ui'

import { connectDB, getTableColumns, execSQL } from '../utils/services'
import { injectStrict, SQL_QUERIES, DATABASE_INFO, AnyRecord } from '../types'
import { useShortcut } from '../composables/useShortcut'

const sqlQueries = injectStrict(SQL_QUERIES)
const databaseInfo = injectStrict(DATABASE_INFO)
const activeTable = computed(() => databaseInfo.value.activeTable || 'employees')

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
  }
})
const tableMaxHeight = ref(0)

/**
 * Connected with Databse
 */
const connectDatabase = async () => {
  if (databaseInfo.value.connected) {
    console.warn('Database already connected')
    return
  }
  const res = await connectDB(activeTable.value)
  databaseInfo.value.connected = !!res
}

// init the table views without data
const initTableColumns = async (tableName: string) => {
  const params = encodeURIComponent(`select * from ${tableName}`)
  const tableColumns = await getTableColumns(params)
  databaseInfo.value.activeTable = tableName
  databaseInfo.value.tableColumns = tableColumns
  // TODO sorter map with column type
  columns.value = tableColumns.map((item: any) => {
    return {
      title: item.column,
      key: item.column,
      sorter: (a: any, b: any) => a[item.column] - b[item.column]
    }
  })
}

// query the new sql
const query = async () => {
  const params = encodeURIComponent(sqlQueries.value)
  const res = await execSQL(params)
  return res
}

const notification = useNotification()

const getTableData = async () => {
  data.value = await query()
  pagination.value.page = 1
}

debouncedWatch(
  () => databaseInfo.value.manualRun,
  getTableData,
  {
    immediate: true,
    deep: true,
    debounce: 333
  }
)

useShortcut({
  '⌘+e, ctrl+e': async () => {
    await getTableData()
    notification.success({
      title: 'Info',
      content: 'The Queries Runs Successfully!',
      duration: 2000
    })
  },
  '⌘+s, ctrl+s': () => {
    console.log('⌘+s')
  }
})

onMounted(async () => {
  await connectDatabase()
  await initTableColumns(activeTable.value)
  await getTableData()
  tableMaxHeight.value = tableviewRef.value.offsetHeight - 28
})
</script>
