<template>
  <div class="codemirror-container" ref="editorEl"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, computed, watch, inject } from 'vue'
import { history } from '@codemirror/history'
import { Compartment } from '@codemirror/state'
import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap, standardKeymap, indentWithTab } from '@codemirror/commands'
import { schemaCompletion, sql, SQLite } from '@codemirror/lang-sql'
import { autocompletion } from '@codemirror/autocomplete'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { oneDark } from '@codemirror/theme-one-dark'

import { IS_DARKMODE } from '../../types'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits<{
  (e: 'update:modelValue', content: string): void
}>()

const isDarkmode = inject(IS_DARKMODE)
const editorEl = ref<Element>()
const activeTheme = computed(() => isDarkmode?.value ? oneDark : defaultHighlightStyle.fallback)

const store = reactive({
  doc: ref(props.modelValue),
  view: ref<EditorView>()
})

const initEditor = () => {
  const onUpdate = () => {
    return EditorView.updateListener.of(({ state }) => {
      store.doc = state.doc.toString()
      emit('update:modelValue', store.doc)
    })
  }

  const tabBinding = () => {
    return [
      keymap.of([...defaultKeymap, ...standardKeymap, indentWithTab]),
      EditorState.tabSize.of(2)
    ]
  }

  const SQLExtension = new Compartment()

  const editorState = EditorState.create({
    doc: store.doc,
    extensions: [
      basicSetup,

      schemaCompletion({
        dialect: SQLite
      }),

      SQLExtension.of(sql({
        dialect: SQLite
      })),

      autocompletion({
        activateOnTyping: true,
        defaultKeymap: true
      }),

      history(),

      onUpdate(),

      tabBinding(),

      activeTheme.value
    ]
  })

  store.view = new EditorView({
    state: editorState,
    parent: editorEl.value
  })
}

const disposeEditor = () => {
  store?.view?.destroy()
}

const recreateEditor = () => {
  disposeEditor()
  initEditor()
}

watch(
  () => isDarkmode?.value,
  recreateEditor
)

onMounted(initEditor)

onUnmounted(disposeEditor)
</script>

<style lang="scss">
.codemirror-container {
  height: 100%;
  overflow-y: auto;

  .cm-editor {
    height: 100%;
  }
}
</style>