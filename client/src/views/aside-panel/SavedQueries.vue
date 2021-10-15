<template>
    <h1
      class="p-1 px-4 border-b border-$border-color font-semibold"
      bg="blue-gray-100 dark:dark-400"
      text="gray-700 dark:true-gray-200"
    >
    {{ $t('aside.saved_sql_queries') }}
  </h1>
  <div
    v-for="query in queries"
    :key="query.id"
    class="saved-queries relative m-2 p-2 cursor-pointer bg-true-gray-800"
    text="[14px] gray-700 dark:true-gray-400"
    bg="blue-gray-100 dark:true-gray-800"
    @click="handleSelectQuery(query)"
  >
    <label class="block w-full flex items-center font-semibold">
      <simple-icons:sqlite class="h-4 w-4 mr-2" /> {{query.label}}
    </label>
    <time class="block w-full flex items-center mt-2">
      <carbon:time class="h-4 w-4 mr-2" /> {{query.savedAt}}
    </time>
    <span class="close--btn" @click.stop="handleRemoveQuery(query)">
      <carbon:close class="icon" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useReplStore } from '../../store/repl'
import { useTabsStore, TabInfo } from '../../store/tabs'
import { useAsideStore } from '../../store/aside'

const replStore = useReplStore()
const tabsStore = useTabsStore()
const asideStore = useAsideStore()

const queries = computed(() => {
  return asideStore.savedQueries.filter(query => query.queries !== '')
})

const handleSelectQuery = (query: TabInfo) => {
  replStore.tableInfo.sqlQueries = query.queries || ''
  tabsStore.addTab(query.label, query.queries || '')
}

const handleRemoveQuery = (query: TabInfo) => {
  asideStore.removeQuery(query)
}
</script>

<style lang="scss" scoped>
.saved-queries {
  .close--btn {
    @apply absolute right-2 top-2 hidden;
    @apply hover:bg-gray-200 dark:hover:bg-dark-300;;
  }
  &:hover {
    .close--btn {
      display: block;
    }
  }
}
</style>