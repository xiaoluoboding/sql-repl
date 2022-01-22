<template>
  <h1
    class="p-1 px-4 mb-4 border-b border-$border-color font-semibold"
    bg="blue-gray-100 dark:dark-400"
    text="gray-700 dark:true-gray-200"
  >
    {{ $t('aside.database-connections') }}
  </h1>
  <div
    v-if="replStore.dbSchemaTree && replStore.dbSchemaTree.length > 0"
    class="aside-menu--connection-tree px-4"
  >
    <NTree
      class="h-[calc(100vh-176px)] overflow-y-auto"
      block-line
      :data="replStore.dbSchemaTree"
      :default-expanded-keys="replStore.expandedKeys"
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
      :action="uploadAction"
      accept=".db,.sqlite,.sqlite3"
      class="w-full py-8"
      with-credentials
      @change="uploadChanged"
      @finish="handleUploaded"
    >
      <n-upload-dragger class="w-full">
        <div class="flex justify-center mb-4">
          <carbon:upload class="h-6 w-6" />
        </div>
        <div class="text-xl mb-4">
          <p>Drop database file here</p>
          <p>or</p>
          <p>Click to upload</p>
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
import { LOCAL_HOST } from '../../constants/config'

const replStore = useReplStore()
const asideStore = useAsideStore()

const message = useMessage()
const expandedKeys = computed(() => [`root-${replStore.databaseInfo.activeDB}`])
const uploadAction = `${LOCAL_HOST}/api/v1/sqlite/uploadDatabase`

const uploadChanged = ({ file, event }: any) => {
  console.log(file)
  console.log(event)
}

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

<style lang="scss">
.n-upload-trigger {
  @apply w-full;
}
</style>