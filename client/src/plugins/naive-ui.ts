import type { App } from 'vue'
import {
  create,
  NButton,
  NButtonGroup,
  NSpace,
  NTooltip,
  NPopover,
  NInput,
  NTag,
  NPopconfirm,
  NUpload,
  NUploadDragger,
  NDataTable,
  NTree,
  NNotificationProvider
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NButtonGroup,
    NSpace,
    NTooltip,
    NPopover,
    NInput,
    NTag,
    NPopconfirm,
    NUpload,
    NUploadDragger,
    NDataTable,
    NTree,
    NNotificationProvider,
  ],
})

const install = (app: App) => {
  app.use(naive)
}

export default install
