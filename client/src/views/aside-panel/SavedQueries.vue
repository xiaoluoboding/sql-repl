<template>
  <h1 class="p-2 border-b border-$border-color font-semibold text-gray-700 dark:text-true-gray-200">
    Saved SQL Queries
  </h1>
  <div
    v-for="query in queries"
    :key="query.id"
    class="m-2 p-2 cursor-pointer bg-true-gray-800"
    text="[14px] gray-700 dark:true-gray-400"
    bg="blue-gray-100 dark:true-gray-800"
    @click="handleSelectQuery(query)"
  >
    <label class="block w-full flex items-center font-semibold">
      <carbon:code class="h-4 w-4 mr-2" /> {{query.label}}
    </label>
    <time class="block w-full flex items-center mt-2">
      <carbon:time class="h-4 w-4 mr-2" /> {{query.savedAt}}
    </time>
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
  tabsStore.addTab(query.queries || '')
}
</script>