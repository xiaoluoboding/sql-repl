<template>
  <nav class="header-nav bg-blue-gray-50 dark:bg-true-gray-900">
    <h1
      class="flex-center"
      text="gray-900 dark:blue-gray-100"
    >
      <!-- <img alt="logo" src="/logo.svg"> -->
      <span text="xl" font="medium">SQL REPL</span>
    </h1>
    <div class="links flex" text="gray-900 dark:blue-gray-100">
      <div class="actions flex items-center">
        <!-- <button class="actions--btn share" >
          <carbon-share class="h-5 w-5" />
        </button>
        <button class="actions--btn download" >
          <carbon-download class="h-5 w-5" />
        </button> -->
        <button class="actions--btn darkmode" :title="$t('button.toggle_dark')" @click="toggleDarkmode">
          <carbon-moon class="h-5 w-5" v-if="store.isDarkmode" />
          <carbon-sun class="h-5 w-5" v-else />
        </button>
        <button class="actions--btn langages" :title="$t('button.toggle_langs')" @click="e => toggleLocales()">
          <carbon-language class="h-5 w-5" />
        </button>
        <button class="actions--btn settings" @click="isShowSettings = true">
          <carbon-settings class="h-5 w-5" />
        </button>
        <button class="actions--btn download">
          <a href="https://github.com/xiaoluoboding/sql-repl" target="_blank">
            <simple-icons-github class="h-5 w-5" />
          </a>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useReplStore } from '../store/repl'

const store = useReplStore()
const isShowSettings = ref(false)
const { availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const toggleDarkmode = () => {
  store.isDarkmode = !store.isDarkmode
}
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
  @apply hover:bg-blue-gray-200 hover:dark:bg-true-gray-800;
  @apply rounded-md outline-transparent;
  @apply h-9;
}
</style>
