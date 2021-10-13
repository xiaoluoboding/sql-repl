<template>
  <aside class="aside-menu">
    <div class="aside-menu--items">
      <div class="actions flex items-center justify-center flex-col space-y-4">
        <button
          class="actions--btn"
          :class="{active: asideStore.activeMenu === 'connections'}"
          @click="asideStore.activeMenu = 'connections'"
        >
          <carbon:data-base class="h-6 w-6" />
        </button>
        <button
          class="actions--btn"
          :class="{active: asideStore.activeMenu === 'SQL Queries'}"
          @click="asideStore.activeMenu = 'SQL Queries'"
        >
          <carbon:query-queue class="h-6 w-6" />
        </button>
      </div>
    </div>
    <div class="aside-menu--content relative w-full">
      <template  v-if="asideStore.activeMenu === 'connections'">
        <h1 class="p-2 border-b border-$border-color font-semibold text-gray-700 dark:text-true-gray-200">
          Database Connections
        </h1>
        <div class="aside-menu--tablecols p-4" v-if="treeData && treeData.length > 0">
          <NTree
            default-expand-all
            block-line
            :data="treeData"
          />
        </div>
        <div class="aside-menu--actions p-4 absolute left-0 bottom-0 w-full">
          <n-button ghost class="w-full">
            {{$t('button.create_connection')}}
          </n-button>
        </div>
      </template>
      <template v-else>
        <h1 class="p-2 border-b border-$border-color font-semibold text-gray-700 dark:text-true-gray-200">
          Saved SQL Queries
        </h1>
        <div
          v-for="query in queries"
          :key="query.id"
          class="m-2 p-2 text-[14px] cursor-pointer bg-true-gray-800 text-gray-700 dark:text-true-gray-400"
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
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { h, ref, computed, watch, nextTick } from 'vue'

import { AnyRecord } from '../types'
import { useReplStore } from '../store/repl'
import { useTabsStore, TabInfo } from '../store/tabs'
import { useAsideStore } from '../store/aside'

const treeData = ref<AnyRecord[]>([])
const replStore = useReplStore()
const tabsStore = useTabsStore()
const asideStore = useAsideStore()

const queries = computed(() => {
  return asideStore.savedQueries.filter(query => query.queries !== '')
})

// init the table views without data
const initTableColumns = () => {
  return replStore.tableInfo.tableColumns.map((item: any) => {
    return {
      label: item.name,
      key: item.column,
      suffix: () => h(
        'div',
        {},
        { default: () => item.type }
      )
    }
  })
}

const handleSelectQuery = (query: TabInfo) => {
  replStore.tableInfo.sqlQueries = query.queries || ''
  tabsStore.addTab(query.queries || '')
}

watch(
  () => replStore.tableInfo.tableColumns,
  () => {
  const tableName = replStore.tableInfo.activeTable
  const tableColumns = initTableColumns()
  
  nextTick(() => {
    treeData.value = [{
      label: tableName,
      children: tableColumns
    }]
  })
})
</script>

<style lang="scss" scoped>
.aside-menu {
  @apply grid bg-white dark:bg-true-gray-900 h-full relative;
  grid-template-columns: 48px 1fr; 
  gap: 0px 0px;

  &--items {
    @apply  w-12 h-full bg-white dark:bg-true-gray-900 border-r border-$border-color;
    .actions {
      @apply py-4;
    }
  }

  &--content {
    @apply flex-1 h-full;
  }

  .actions--btn {
    @apply my-0 mx-1 p-2;
    @apply text-gray-700 dark:text-true-gray-500;
    @apply hover:bg-gray-100 hover:dark:bg-true-gray-800;
    @apply rounded-md outline-transparent;
    @apply h-10;

    &.active {
      @apply text-gray-900 dark:text-true-gray-100;
    }
  }
}
</style>
