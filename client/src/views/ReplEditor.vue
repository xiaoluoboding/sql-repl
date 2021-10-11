<template>
  <div class="repl-editor">
    <div class="repl-editor--codemirror">
      <Codemirror v-model="sqlQueries" />
    </div>
    <div class="repl-editor--actions">
      <n-button size="small">{{$t('common.save')}}</n-button>
      <n-button size="small" type="primary" @click="handleRunSQL">{{$t('common.run')}}</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'

import Codemirror from '../components/codemirror/index.vue'
import { injectStrict, SQL_QUERIES, DATABASE_INFO } from '../types'

const sqlQueries = injectStrict(SQL_QUERIES)
const databaseInfo = injectStrict(DATABASE_INFO)

sqlQueries.value = `select * from employees e
where e.salary > 10000`

const handleRunSQL = () => {
  databaseInfo.value.manualRun = true
  nextTick(() => (databaseInfo.value.manualRun = false))
}
</script>

<style lang="scss">
.repl-editor {
  @apply relative bg-white dark:bg-true-gray-900 h-full;

  &--codemirror {
    height: calc(100% - 36px);
  }

  &--actions {
    @apply absolute bottom-0 w-full h-9 p-1;
    @apply flex items-center justify-end;
    @apply space-x-2;
  }
}
</style>