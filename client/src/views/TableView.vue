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
      size="small"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :max-height="tableMaxHeight"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { debouncedWatch } from '@vueuse/core'

import { AnyRecord } from '../types/index'
import { getTableColumns, execSQL } from '../utils/services'
import { injectStrict, SQL_QUERIES } from '../types'

const sql = injectStrict(SQL_QUERIES)

const tableviewRef = ref()
const data = ref<AnyRecord[]>([])
const columns = ref<AnyRecord[]>([])
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
  }
})
const tableMaxHeight = ref(0)

// init the table views without data
const initTableColumns = async (tableName: string = 'employees') => {
  const tableColumns = await getTableColumns(encodeURIComponent(`select * from ${tableName}`))
  console.log(tableColumns)
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
  const params = encodeURIComponent(sql.value)
  const res = await execSQL(params)
  return res
}

const getTableData = async () => {
  data.value = await query()
  pagination.value.page = 1
}

debouncedWatch(
  () => sql.value,
  (newVal) => {
    getTableData()
  },
  {
    immediate: true,
    deep: true,
    debounce: 333
  }
)

onMounted(async () => {
  await initTableColumns()
  await getTableData()
  tableMaxHeight.value = tableviewRef.value.offsetHeight - 28
})
</script>
