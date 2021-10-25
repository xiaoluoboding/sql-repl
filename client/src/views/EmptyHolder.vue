<template>
  <div
    class="h-full w-full p-40"
    bg="white dark:true-gray-900"
  >
    <main>
      <h1 class="font-bold" text="3xl true-gray-900 dark:true-gray-400">SQL REPL</h1>
      <section>
        <h2 class="font-semibold mt-4" text="xl true-gray-700 dark:true-gray-300">{{ $t('common.start') }}</h2>
        <div class="actions mt-4 space-y-4">
          <n-button class="actions--btn" text @click="setupConnection">
            <carbon:connect class="h-4 w-4 mr-2" /> {{ $t('app.set-up-a-new-connection') }}
          </n-button>
          <n-button class="actions--btn" text @click="addNewTab('')">
            <carbon:new-tab class="h-4 w-4 mr-2" /> {{ $t('app.new-tab') }}
          </n-button>
          <n-button class="actions--btn" text @click="selectQueries">
            <carbon:query-queue class="h-4 w-4 mr-2" /> {{ $t('app.select-queries') }}.
          </n-button>
        </div>
      </section>
      <section class="mt-16">
        <h2 class="font-semibold mt-4" text="xl true-gray-700 dark:true-gray-500">{{ $t('common.shortcut') }}</h2>
        <ul class="space-y-2 mt-4" text="dark:true-gray-500">
          <li>{{ $t('app.new-tab') }}: <kbd>⌥ + T</kbd></li>
          <li>{{ $t('app.close-tab') }}: <kbd>⌥ + W</kbd></li>
          <li>{{ $t('app.save-queries') }}: <kbd>⌘ + S</kbd></li>
          <li>{{ $t('app.run-queries') }}: <kbd>⌘ + E</kbd></li>
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
  tabsStore.addTab('', query)
}

const selectQueries = () => {
  asideStore.activeMenu = 'savedQueries'
}

const setupConnection = () => {
  asideStore.showConnectionModal = true
}
</script>

<style lang="scss" scoped>
.actions--btn {
  @apply flex-center focus:outline-transparent;
  @apply text-true-gray-700 dark:text-true-gray-300 hover:text-light-blue-400;
}
</style>