<template>
  <div class="repl-editor">
    <div class="repl-editor--codemirror">
      <Codemirror v-model="sql" />
    </div>
    <div class="repl-editor--actions">
      <n-button size="small">Save</n-button>
      <n-button size="small" type="primary">Run</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Codemirror from '../components/codemirror/index.vue'
import { injectStrict, SQL_QUERIES } from '../types'

const sql = injectStrict(SQL_QUERIES)

sql.value = `select * from employees e
where e.salary > 10000`
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