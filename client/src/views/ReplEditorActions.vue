<template>
  <div class="repl-editor--actions">
    <div class="logo flex-1">
      <simple-icons:sqlite />
    </div>
    <div class="actions flex flex-col items-center space-y-2">
      <n-tooltip placement="left-center">
        <template #trigger>
          <button class="actions--btn" @click="handleCopySQL">
            <carbon:copy class="h-4 w-4" />
          </button>
        </template>
        {{ $t('button.copy-sql-queries') }}
      </n-tooltip>
      <n-tooltip placement="left-center">
        <template #trigger>
          <button class="actions--btn" @click="handleSaveSQL">
            <carbon-save class="h-4 w-4" />
          </button>
        </template>
        {{ $t('button.save_sql_queries') }}
      </n-tooltip>
      <n-tooltip placement="left-center">
        <template #trigger>
          <button class="actions--btn" @click="handleRunSQL">
            <carbon-play-filled-alt class="h-4 w-4" />
          </button>
        </template>
        {{ $t('button.run_sql_queries') }}
      </n-tooltip>
    </div>
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      :title="$t('modal.save_title')"
      :positive-text="$t('common.save')"
      :negative-text="$t('common.cancel')"
      @positive-click="doSaveSQL"
      @negative-click="showModal = false"
    >
      <n-input
        v-model:value="tabsStore.activeTab.label"
        class="mt-4"
        :placeholder="$t('modal.save_placeholder')"
      />
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { debouncedWatch, useClipboard } from '@vueuse/core'
import { useMessage } from 'naive-ui'

import { useShortcut } from '../composables/useShortcut'
import { useTabsStore } from '../store/tabs'
import { useReplStore } from '../store/repl'
import { useAsideStore } from '../store/aside'

const message = useMessage()
const replStore = useReplStore()
const tabsStore = useTabsStore()
const asideStore = useAsideStore()

const { copy } = useClipboard({
  source: replStore.tableInfo.sqlQueries
})

const showModal = ref(false)

const doSaveSQL = () => {
  tabsStore.saveTab()
  asideStore.upsertQueries({
    ...tabsStore.activeTab,
    label: tabsStore.activeTab.label,
    queries: replStore.tableInfo.sqlQueries
  })
  message.success('Saved!')
}

const handleCopySQL = () => {
  copy()
  message.success('Copied to clipboard!')
}

const handleSaveSQL = () => {
  if (/Untitled/.test(tabsStore.activeTab.label)) {
    showModal.value = true
  } else {
    doSaveSQL()
  }
}

const handleRunSQL = () => {
  replStore.tableInfo.manualRun = true
  nextTick(() => {
    replStore.tableInfo.manualRun = false

    message.success('The Queries Runs Successfully!')
  })
}

debouncedWatch(
  () => replStore.tableInfo.sqlQueries,
  (newVal, oldVal) => {
    if (newVal !== oldVal && newVal !== '') {
      tabsStore.updateTab({
        isSaved: false
      })
    }
  },
  {
    deep: true,
    debounce: 333
  }
)

useShortcut({
  '⌘+s, ctrl+s': () => {
    handleSaveSQL()
  }
})
</script>

<style lang="scss" scoped>
.repl-editor--actions {
  @apply h-full w-9 p-2;
  @apply flex flex-col items-center justify-end;
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