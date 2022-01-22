<template>
  <aside class="aside-menu">
    <div class="aside-menu--items">
      <div class="actions">
        <button
          class="actions--btn"
          :class="{active: asideStore.activeMenu === 'connections'}"
          @click="asideStore.activeMenu = 'connections'"
        >
          <carbon:data-base class="h-5 w-5" />
        </button>
        <button
          class="actions--btn"
          :class="{active: asideStore.activeMenu === 'savedQueries'}"
          @click="asideStore.activeMenu = 'savedQueries'"
        >
          <carbon:query-queue class="h-5 w-5" />
        </button>
      </div>
    </div>
    <div class="aside-menu--content relative w-full h-full">
      <KeepAlive>
        <template v-if="asideStore.activeMenu === 'connections'">
          <Connections />
        </template>
        <template v-else>
          <SavedQueries />
        </template>
      </KeepAlive>
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
    @apply  w-12 h-full border-r border-$border-color;
    @apply bg-blue-gray-100 dark:bg-dark-400;
    .actions {
      @apply flex-center flex-col space-y-4 py-4;
    }
  }

  &--content {
    @apply bg-blue-gray-50 dark:bg-dark-900;
    @apply flex-1 h-full;
  }

  .actions--btn {
    @apply my-0 mx-1 p-2;
    @apply text-gray-700 dark:text-true-gray-500;
    @apply hover:bg-blue-gray-200 hover:dark:bg-true-gray-700;
    @apply rounded-md outline-transparent;
    @apply h-9;

    &.active {
      @apply text-gray-900 dark:text-true-gray-100;
      @apply bg-blue-gray-200 dark:bg-true-gray-700;
    }
  }
}
</style>
