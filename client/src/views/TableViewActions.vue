<template>
  <div class="table-view--actions">
    <div class="actions flex flex-col items-center space-y-2">
      <n-tooltip placement="left-center">
        <template #trigger>
          <button class="actions--btn" @click="handleCopyCsv">
            <mdi:clipboard-outline class="h-4 w-4" />
          </button>
        </template>
        {{ $t('button.copy-table-result') }}
      </n-tooltip>
      <n-tooltip placement="left-center">
        <template #trigger>
          <button class="actions--btn" @click="handleExportCSV">
            <teenyicons:csv-outline class="h-4 w-4" />
          </button>
        </template>
        {{ $t('button.export-to-csv') }}
      </n-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Papa from 'papaparse'
import { useMessage } from 'naive-ui'

const message = useMessage()

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})

const handleCopyCsv = () => {
  navigator.clipboard.writeText(JSON.stringify(props.data))
  message.success('Table Result Copied to clipboard!!')
}

const handleExportCSV = () => {
  const csv = Papa.unparse(props.data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.href = url
  link.download = 'export.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style lang="scss" scoped>
.table-view--actions {
  @apply h-full w-9 p-2;
  @apply flex flex-col items-center;
  @apply space-y-2;
  @apply bg-blue-gray-100 dark:bg-dark-400;
  @apply text-gray-900 dark:text-blue-gray-100;
}

.actions--btn {
  @apply h-8 p-2;
  @apply hover:bg-blue-gray-200 hover:dark:bg-true-gray-700;
  @apply rounded-md outline-transparent;
}
</style>