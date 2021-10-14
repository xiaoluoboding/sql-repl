<template>
  <div
    class="h-full w-full p-40"
    bg="white dark:true-gray-900"
  >
    <main>
      <h1 class="font-bold" text="3xl true-gray-900 dark:true-gray-400">SQL REPL</h1>
      <section>
        <h2 class="font-semibold mt-4" text="xl true-gray-700 dark:true-gray-500">Start</h2>
        <div class="actions mt-2 space-y-4">
          <n-button class="actions--btn" text>
            <carbon:connect class="h-4 w-4 mr-2" /> Setup a new connection
          </n-button>
          <n-button class="actions--btn" text @click="addNewTab('')">
            <carbon:new-tab class="h-4 w-4 mr-2" /> New tab
          </n-button>
          <n-button class="actions--btn" text @click="selectQueries">
            <carbon:query-queue class="h-4 w-4 mr-2" /> Select the saved queries from left bar.
          </n-button>
        </div>
      </section>
      <section class="mt-16">
        <h2 class="font-semibold mt-4" text="xl true-gray-700 dark:true-gray-500">Shortcut</h2>
        <ul class="space-y-2 mt-2" text="dark:gray-200">
          <li>New Tab: <kbd>⌥ + T</kbd></li>
          <li>Close Tab: <kbd>⌥ + W</kbd></li>
          <li>Save Queries: <kbd>⌘ + S</kbd></li>
          <li>Run Queries: <kbd>⌘ + E</kbd></li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useReplStore } from '../store/repl'
import { useTabsStore } from '../store/tabs'
import { useAsideStore } from '../store/aside'

const replStore = useReplStore()
const tabsStore = useTabsStore()
const asideStore = useAsideStore()

const addNewTab = (query: string) => {
  replStore.tableInfo.sqlQueries = query
  tabsStore.addTab(query)
}

const selectQueries = () => {
  asideStore.activeMenu = 'SQL Queries'
}
</script>

<style lang="scss" scoped>
.actions--btn {
  @apply flex justify-center items-center focus:outline-transparent;
  @apply text-true-gray-700 dark:text-true-gray-500 hover:text-light-blue-400;
}
</style>