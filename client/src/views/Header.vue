<template>
  <nav class="header-nav bg-white dark:bg-true-gray-900">
    <h1
      class="flex justify-center items-center"
      text="gray-900 dark:blue-gray-100"
    >
      <!-- <img alt="logo" src="/logo.svg"> -->
      <span text="xl" font="medium">SQL REPL</span>
    </h1>
    <div class="links flex" text="gray-900 dark:blue-gray-100">
      <div class="actions flex items-center">
        <button class="actions--btn share" >
          <carbon-share class="h-5 w-5" />
        </button>
        <button class="actions--btn download" >
          <carbon-download class="h-5 w-5" />
        </button>
        <button class="actions--btn darkmode" @click="isDarkmode = !isDarkmode">
          <carbon-moon class="h-5 w-5" v-if="isDarkmode" />
          <carbon-sun class="h-5 w-5" v-else />
        </button>
        <button class="actions--btn settings" @click="isShowSettings = true">
          <carbon-settings class="h-5 w-5" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { injectStrict, IS_DARKMODE } from '../types'

const isDarkmode = injectStrict(IS_DARKMODE)
const isShowSettings = ref(false)
</script>

<style lang="scss" scoped>
.header-nav {
  @apply relative box-border flex justify-between;
  @apply py-0 px-4;
  height: var(--nav-height);
  box-shadow: 0 0 1px 1px var(--border-color);
  z-index: 999;
}

.actions--btn {
  @apply my-0 mx-1 p-2;
  @apply hover:bg-gray-100 hover:dark:bg-true-gray-800;
  @apply rounded-md;
  @apply h-9;
}
</style>
