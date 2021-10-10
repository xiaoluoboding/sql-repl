<template>
  <NConfigProvider
    class="repl-wrapper"
    bg="white dark:gray-900"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <Header />
    <Splitpanes class="default-theme">
      <Pane size="25" min-size="20">
        <Aside />
      </Pane>
      <Pane size="75">
        <Splitpanes horizontal class="default-theme">
          <Pane size="50">
            <ReplEditor />
          </Pane>
          <Pane size="50">
            <TableView />
          </Pane>
        </Splitpanes>
      </Pane>
    </Splitpanes>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { provide, computed, ref } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'

import Header from './views/Header.vue'
import Aside from './views/Aside.vue'
import ReplEditor from './views/ReplEditor.vue'
import TableView from './views/TableView.vue'

import { useDark } from './composables/useDark'
import { IS_DARKMODE, SQL_QUERIES } from './types'

const isDark = useDark()
const theme = computed(() => isDark.value ? darkTheme : null)
provide(IS_DARKMODE, isDark)
provide(SQL_QUERIES, ref(''))

const themeOverrides = {
  common: {
    // light-blue-400
    primaryColor: '#38bdf8',
    // light-blue-300
    primaryColorHover: '#7dd3fc',
    // light-blue-500
    primaryColorPressed: '#0ea5e9',
    // light-blue-600
    primaryColorSuppl: '#0284c7'
  }
}
</script>

<style>
body {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--base);
  margin: 0;
  --base: #444;
  --nav-height: 50px;
  --font-code: 'Source Code Pro', monospace;
  --color-branding: #3ca877;
  --color-branding-dark: #416f9c;
  --border-color: rgba(200, 200, 200, .12);
  @apply bg-gray-100 dark:bg-gray-900;
}

.repl-wrapper {
  height: calc(100vh - var(--nav-height));
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
