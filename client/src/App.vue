<template>
  <NConfigProvider
    class="repl-wrapper"
    bg="white dark:gray-900"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <NMessageProvider>
      <Header />
      <Splitpanes class="default-theme repl-container">
        <Pane size="20" min-size="0" max-size="30">
          <AsidePanel />
        </Pane>
        <Pane size="80">
          <QuerySelector />
          <template v-if="hasTabs">
            <Splitpanes horizontal class="default-theme repl-content" :key="tabsStore.activeTab.id">
              <Pane size="50">
                <ReplEditor />
              </Pane>
              <Pane size="50">
                <TableView />
              </Pane>
            </Splitpanes>
          </template>
          <template v-else>
            <EmptyHolder />
          </template>
        </Pane>
      </Splitpanes>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'

import Header from './views/Header.vue'
import AsidePanel from './views/aside-panel/index.vue'
import ReplEditor from './views/ReplEditor.vue'
import QuerySelector from './views/QuerySelector.vue'
import TableView from './views/TableView.vue'
import EmptyHolder from './views/EmptyHolder.vue'
import { useReplStore } from './store/repl'
import { useTabsStore } from './store/tabs'

const replStore = useReplStore()
const tabsStore = useTabsStore()
const theme = computed(() => replStore.isDarkmode ? darkTheme : null)
const hasTabs = computed(() => tabsStore.queryTabs.length > 0)

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
html,
body,
#app,
.repl-wrapper {
  @apply h-full;
}

body {
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--base);
  margin: 0;
  --base: #444;
  --nav-height: 48px;
  --query-selector-height: 32px;
  --font-code: 'Source Code Pro', monospace;
  --color-branding: #38bdf8;
  --color-branding-dark: #416f9c;
  --border-color: rgba(200, 200, 200, 0.2);
  @apply bg-gray-100 dark:bg-gray-900;
}

.repl-container {
  height: calc(100vh - var(--nav-height)) !important;
}
.repl-content {
  height: calc(100% - var(--query-selector-height)) !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
