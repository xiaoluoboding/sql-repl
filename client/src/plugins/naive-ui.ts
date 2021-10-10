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
  NTimeline,
  NTimelineItem,
  NUpload,
  NUploadDragger,
  NDataTable
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
    NTimeline,
    NTimelineItem,
    NUpload,
    NUploadDragger,
    NDataTable
  ]
})

const install = (app: App) => {
  app.use(naive)
}

export default install
