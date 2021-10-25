<template>
  <div class="query-selector">
    <div
      v-for="(query, idx) in tabsStore.queryTabs"
      class="query-selector--queries"
      :key="query.id"
      :class="{active: query.id === tabsStore.activeTab.id}"
      @click="handleSelectQuery(query)"
      @mouseover="enterTabIdx = query.idx"
      @mouseleave="enterTabIdx = -1"
    >
      <span class="prefix">
        <carbon:code class="h-4 w-4" />
      </span>
      <span class="label">
        {{ query.label }}
      </span>
      <template v-if="enterTabIdx === query.idx">
        <span class="suffix" @click="handleRemoveQuery()">
          <carbon:close class="icon" />
        </span>
      </template>
      <template v-else>
        <template v-if="!query.isSaved">
          <span class="editing text-gray-400 dark:text-gray-300">
            <carbon:dot-mark class="h-4 w-4" />
          </span>
        </template>
        <template v-else-if="query.id === tabsStore.activeTab.id">
          <span class="suffix" @click="handleRemoveQuery()">
            <carbon:close class="icon" />
          </span>
        </template>
        <template v-else>
          <span class="suffix" />
        </template>
      </template>
    </div>
    <button class="query-selector--added" @click="handleAddQuery('')">
      <carbon-add class="h-5 w-5 hover:bg-gray-200 hover:dark:bg-dark-300 hover:rounded-sm" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debouncedWatch } from '@vueuse/core'

import { useReplStore } from '../store/repl'
import { useTabsStore, TabInfo } from '../store/tabs'
import { useShortcut } from '../composables/useShortcut'
import { debounce } from '../utils'

const enterTabIdx = ref(-1)
const replStore = useReplStore()
const tabsStore = useTabsStore()

const handleAddQuery = (query: string) => {
  replStore.tableInfo.sqlQueries = query
  tabsStore.addTab('', query)
}

const handleRemoveQuery = () => {
  tabsStore.removeTab()
  replStore.tableInfo.sqlQueries = tabsStore.queryTabs.length > 0
    ? tabsStore.activeTab.queries
    : ''
}

const handleSelectQuery = (query: TabInfo) => {
  tabsStore.setActiveTab(query)
  replStore.tableInfo.sqlQueries = query.queries
}

// const initQueries = `select *
// from ${replStore.databaseInfo.activeDB}
// limit 10`

tabsStore.setActiveTab(tabsStore.activeTab)

// update queries in right tab
debouncedWatch(
  () => replStore.tableInfo.sqlQueries,
  (newVal) => {
    tabsStore.updateTab({
      queries: newVal
    })
  },
  {
    deep: true,
    debounce: 333
  }
)

useShortcut({
  '⌥+w, alt+w': debounce(() => {
    console.log('⌥+w')
    handleRemoveQuery()
  }, 333),
  '⌥+t, alt+t': debounce(() => {
    console.log('⌥+t')
    handleAddQuery('')
  }, 333)
})
</script>

<style lang="scss" scoped>
.query-selector {
  @apply flex box-border;
  @apply text-dark-600 dark:text-true-gray-300;
  @apply bg-blue-gray-100 dark:bg-dark-400;

  &--queries {
    @apply inline-flex place-items-center;
    @apply cursor-pointer box-border;
    @apply px-1 border-r border-$border-color;
    @apply text-[12px] leading-4 font-semibold;
    @apply text-true-gray-400;
    font-family: var(--font-code);

    &.active {
      @apply relative cursor-text;
      @apply bg-white dark:bg-dark-900;
      @apply text-gray-900 dark:text-$color-branding ;

      &:before {
        content: '';
        @apply h-[2px] w-full;
        @apply absolute left-0 bottom-0;
        @apply bg-$color-branding;
      }
    }

    .label {
      @apply inline-block;
      @apply py-2 px-2;
    }

    .suffix,
    .editing,
    .prefix {
      @apply flex-center h-4 w-4;
    }

    input {
      @apply bg-transparent outline-none focus:outline-none;
      @apply w-32 rounded-[3px] px-1.5 py-1 ml-1.5;
    }
  }

  &--added {
    @apply  h-8 w-8 flex-center;
    @apply outline-transparent focus:outline-transparent;
  }

  .icon {
    @apply cursor-pointer rounded-sm h-4 w-4;
    @apply text-dark-600 dark:text-true-gray-300;
    @apply hover:bg-gray-200 hover:dark:bg-dark-300;
  }
}
</style>
