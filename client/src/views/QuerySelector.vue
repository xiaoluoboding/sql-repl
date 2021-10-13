<template>
  <div class="query-selector">
    <div
      v-for="(query, idx) in store.queryTabs"
      class="query-selector--queries"
      :key="query.id"
      :class="{active: query.id === store.activeTab.id}"
      @click="handleSelectQuery(query)"
    >
      <span class="prefix">
        <carbon:code class="h-4 w-4" />
      </span>
      <span class="label">
        {{ query.label }} #{{query.idx}}
      </span>
      <span class="editing text-gray-400 dark:text-gray-300" v-if="!query.isSaved">
        <carbon:dot-mark class="h-4 w-4" />
      </span>
      <span class="suffix" @click="handleRemoveQuery()" v-else>
        <carbon:close class="icon" />
      </span>
    </div>
    <button class="query-selector--added" @click="handleAddQuery">
      <carbon-add class="h-5 w-5 hover:bg-gray-200 hover:dark:bg-dark-300 hover:rounded-sm" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from '../store/tabs'
import { useShortcut } from '../composables/useShortcut'
import { debounce } from '../utils'

const store = useTabsStore()

const handleAddQuery = () => store.addTab()
const handleRemoveQuery = () => store.removeTab()
const handleSelectQuery = (query: any) => store.setActiveTab(query)

store.setActiveTab(store.queryTabs[0])

useShortcut({
  '⌥+w, alt+w': debounce(() => {
    console.log('⌥+w')
    handleRemoveQuery()
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
        @apply content h-[3px] w-full;
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
      @apply flex items-center justify-center h-4 w-4;
    }

    input {
      @apply bg-transparent outline-none focus:outline-none;
      @apply w-32 rounded-[3px] px-1.5 py-1 ml-1.5;
    }
  }

  &--added {
    @apply  h-8 w-8 flex justify-center items-center;
    @apply outline-transparent focus:outline-transparent;
  }

  .icon {
    @apply cursor-pointer rounded-sm h-4 w-4;
    @apply text-dark-600 dark:text-true-gray-300;
    @apply hover:bg-gray-200 hover:dark:bg-dark-300;
  }
}
</style>
