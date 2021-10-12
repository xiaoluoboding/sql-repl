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
import { ref, onMounted, h } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { useNotification } from 'naive-ui'

import { execSQL } from '../utils/services'
import { AnyRecord } from '../types'
import { useShortcut } from '../composables/useShortcut'
import { useReplStore } from '@/store/index'

const store = useReplStore()
const notification = useNotification()

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
  columns.value = store.tableInfo.tableColumns.map((item: any) => {
    return {
      title: item.column,
      key: item.column,
      sorter: (a: any, b: any) => a[item.column] - b[item.column]
    }
  })
}

const getTableData = async () => {
  const params = encodeURIComponent(store.tableInfo.sqlQueries)
  data.value = await execSQL(params)
  pagination.value.page = 1
}

debouncedWatch(
  () => store.tableInfo.manualRun,
  getTableData,
  {
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
  await store.connectDatabase()
  await store.initTableColumns()
  await formatTableColumns()
  await getTableData()
  tableMaxHeight.value = tableviewRef.value.offsetHeight - 28
})
</script>
