<template>
  <div class="repl-editor">
    <div class="repl-editor--codemirror">
      <Codemirror
        v-model="replStore.tableInfo.sqlQueries"
        :hint-info="replStore.editorHintInfo"
      />
    </div>
    <ReplEditorActions />
  </div>
</template>

<script lang="ts" setup>
import Codemirror from '../components/Codemirror.vue'
import ReplEditorActions from './ReplEditorActions.vue'
import { useReplStore } from '../store/repl'

const replStore = useReplStore()
</script>

<style lang="scss">
.repl-editor {
  @apply flex h-full w-full;
  @apply relative bg-white dark:bg-true-gray-900 h-full;

  &--codemirror {
    @apply flex-1;
  }
}
</style>