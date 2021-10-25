<template>
  <div class="table-view bg-white dark:bg-true-gray-900 h-full" ref="tableviewRef">
    <div class="table-view--content">
      <n-data-table
        size="mini"
        :bordered="false"
        :columns="tableColumns"
        :data="tableData"
        :pagination="tableData.length === 0 ? false : pagination"
        flex-height
        :style="{height: `${tableMaxHeight}px`}"
      >
        <template #empty>
          <div class="p-20 text-gray-100 dark:text-true-gray-700">
            <svg width="128" height="128" viewBox="0 0 647.63626 632.17383">
              <path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="currentColor"/>
              <path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"/>
              <path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" fill="#38bdf8"/><circle cx="190.15351" cy="24.95465" r="20" fill="#38bdf8"/><circle cx="190.15351" cy="24.95465" r="12.66462" fill="currentColor"/>
              <path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="currentColor"/><path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"/>
              <path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" fill="#38bdf8"/><circle cx="433.63626" cy="105.17383" r="20" fill="#38bdf8"/><circle cx="433.63626" cy="105.17383" r="12.18187" fill="currentColor"/>
            </svg>
          </div>
        </template>
      </n-data-table>
    </div>
    <TableViewActions :data="tableData" />
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { debouncedWatch, useResizeObserver } from '@vueuse/core'
import { useMessage } from 'naive-ui'

import { execSQL } from '../utils/services'
import { AnyRecord } from '../types'
import { useShortcut } from '../composables/useShortcut'
import { useReplStore } from '../store/repl'
import TableViewActions from './TableViewActions.vue'

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
    const sorter = (a: any, b: any) => {
      const aCol = a[item.column]
      const bCol = b[item.column]
      const type = item.type.toLowerCase()
      if (/integer|float|numeric/.test(type)) {
        return aCol - bCol
      } else if (/date|datetime/.test(type)) {
        return (new Date(aCol) as any) - (new Date(bCol) as any)
      } else if (/text|varchar/.test(type)) {
        return 'default'
      }

      return 'default'
    }
    return {
      title: item.column,
      key: item.column,
      sorter
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

useResizeObserver(tableviewRef, (entries) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  tableMaxHeight.value = height - 28 - 18
})
</script>

<style lang="scss">
.table-view {
  @apply flex h-full w-full;
  @apply relative bg-white dark:bg-true-gray-900 h-full;

  &--content {
    @apply flex-1;
  }
}
.dark .n-data-table {
  --th-color: #262626 !important;
  --td-color: #171717 !important;
}
</style>