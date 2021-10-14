<template>
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
import { h, ref, watch, nextTick } from 'vue'
import { useMessage } from 'naive-ui'

import { AnyRecord } from '../../types'
import { useReplStore } from '../../store/repl'
import { useAsideStore } from '../../store/aside'

const replStore = useReplStore()
const asideStore = useAsideStore()

const message = useMessage()
const treeData = ref<AnyRecord[]>([])

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
  console.log(JSON.parse(event.target.response))
  await replStore.connectDatabase()
  await replStore.initTableColumns()
  message.success(`Database ${file.name} Connected Successfully!`)
  asideStore.showConnectionModal = false
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