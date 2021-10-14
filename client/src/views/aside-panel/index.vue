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
        <Connections />
      </template>
      <template v-else>
        <SavedQueries />
      </template>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useAsideStore } from '../../store/aside'
import Connections from './Connections.vue'
import SavedQueries from './SavedQueries.vue'

const asideStore = useAsideStore()
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
