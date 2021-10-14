<template>
  <h1 class="p-2 border-b border-$border-color font-semibold text-gray-700 dark:text-true-gray-200">
    Database Connections
  </h1>
  <div
    v-if="replStore.dbSchemaTree && replStore.dbSchemaTree.length > 0"
    class="aside-menu--tablecols p-4"
  >
    <NTree
      :default-expanded-keys="expandedKeys"
      block-line
      :data="replStore.dbSchemaTree"
    />
  </div>
  <div class="aside-menu--actions p-4 absolute left-0 bottom-0 w-full">
    <n-button ghost class="w-full" @click="asideStore.showConnectionModal = true">
      {{$t('button.create_connection')}}
    </n-button>
  </div>
  <n-modal
    v-model:show="asideStore.showConnectionModal"
    preset="dialog"
    :mask-closable="false"
    :title="$t('button.create_connection')"
  >
    <n-upload
      action="http://localhost:3232/api/v1/sqlite/uploadDatabase"
      accept=".db,.sqlite,.sqlite3"
      with-credentials
      class="w-full py-8"
      @finish="handleUploaded"
    >
      <n-upload-dragger>
        <div class="mb-4">
          <carbon:upload class="h-6 w-6" />
        </div>
        <div class="text-xl mb-4">
          Drop database file here or click to upload
        </div>
      </n-upload-dragger>
    </n-upload>
  </n-modal>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useMessage } from 'naive-ui'

import { useReplStore } from '../../store/repl'
import { useAsideStore } from '../../store/aside'

const replStore = useReplStore()
const asideStore = useAsideStore()

const message = useMessage()
const expandedKeys = computed(() => {
  const dbName = replStore.databaseInfo.activeDB
  return [dbName]
})

const handleUploaded = async ({ file, event }: any) => {
  const res = JSON.parse(event.target.response)
  const getFilename = (filename: string): string => {
    const res = filename.match(/(.+?)(\.[^.]*$|$)/) || []
    return res.length > 0 ? res[res.length - 2] : filename
  }
  const filename = getFilename(file.name)
  replStore.databaseInfo.activeDB = filename
  replStore.tableInfo.activeTable = filename
  replStore.databaseInfo.name = res.data.file.path
  replStore.databaseInfo.connected = false
  await replStore.connectDatabase()
  await replStore.getDBSchema()
  message.success(`Database ${file.name} Connected Successfully!`)
  asideStore.showConnectionModal = false
}
</script>