<template>
  <div class="repl-editor">
    <div class="repl-editor--codemirror">
      <Codemirror v-model="replStore.tableInfo.sqlQueries" :hint-info="hintInfo" />
    </div>
    <EditorActions />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Codemirror from '../components/Codemirror.vue'
import EditorActions from './EditorActions.vue'
import { useReplStore } from '../store/repl'

const replStore = useReplStore()

// TODO make hint info dymanic
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
    @apply bg-blue-gray-100 dark:bg-dark-400;
    @apply text-gray-900 dark:text-blue-gray-100;
  }

  .actions--btn {
    @apply h-8 p-2;
    @apply hover:bg-gray-100 hover:dark:bg-true-gray-700;
    @apply rounded-md outline-transparent;
  }
}
</style>