<template>
  <div class="repl-editor">
    <div class="repl-editor--codemirror">
      <Codemirror v-model="store.tableInfo.sqlQueries" :hint-info="hintInfo" />
    </div>
    <div class="repl-editor--actions">
      <div class="logo flex-1">
        <simple-icons:sqlite />
      </div>
      <div class="actions flex flex-col items-center space-y-2">
        <button class="actions--btn">
          <carbon-save class="h-4 w-4" />
        </button>
        <n-tooltip placement="left-center">
          <template #trigger>
            <button class="actions--btn" @click="handleRunSQL">
              <carbon-play-filled-alt class="h-4 w-4" />
            </button>
          </template>
          {{ $t('button.run_sql_queries') }}
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useNotification } from 'naive-ui'

import Codemirror from '../components/codemirror/index.vue'
import { useReplStore } from '@/store/index'

const store = useReplStore()
const notification = useNotification()

store.tableInfo.sqlQueries = `select *
from employees e
where e.salary > 20000`

const hintInfo = ref({
  tables: [
    { label: 'employees' }
  ],
  schema: {
    employees: [
      { label: 'id' },
      { label: 'name' },
      { label: 'designation' },
      { label: 'manager' },
      { label: 'hired_on' },
      { label: 'salary' },
      { label: 'commission' },
      { label: 'salary' },
      { label: 'dept' }
    ]
  },
})


const handleRunSQL = () => {
  store.tableInfo.manualRun = true
  nextTick(() => {
    store.tableInfo.manualRun = false

    notification.success({
      title: 'Info',
      content: 'The Queries Runs Successfully!',
      duration: 2000
    })
  })
}
</script>

<style lang="scss">
.repl-editor {
  @apply flex h-full w-full;
  @apply relative bg-white dark:bg-true-gray-900 h-full;

  &--codemirror {
    @apply flex-1;
  }

  &--actions {
    @apply h-full w-9 p-2;
    @apply flex flex-col items-center justify-end;
    @apply space-y-2;
    @apply bg-blue-gray-100 dark:bg-dark-700;
    @apply text-gray-900 dark:text-blue-gray-100;
  }

  .actions--btn {
    @apply h-8 p-2;
    @apply hover:bg-gray-100 hover:dark:bg-true-gray-800;
    @apply rounded-md outline-transparent;
  }
}
</style>