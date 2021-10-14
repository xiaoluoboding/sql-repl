<template>
  <div class="codemirror-container" ref="editorEl"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, computed, watch } from 'vue'
import { history } from '@codemirror/history'
import { Compartment } from '@codemirror/state'
import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap, standardKeymap, indentWithTab } from '@codemirror/commands'
import { schemaCompletion, sql, SQLite } from '@codemirror/lang-sql'
import { autocompletion } from '@codemirror/autocomplete'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { oneDark } from '@codemirror/theme-one-dark'

import { useReplStore } from '../store/repl'
import { useAsideStore } from '../store/aside'

const replStore = useReplStore()
const asideStore = useAsideStore()
const props = defineProps({
  modelValue: String,
  hintInfo: Object
})

const emit = defineEmits<{
  (e: 'update:modelValue', content: string): void
}>()

const editorEl = ref<Element>()
const activeTheme = computed(() => {
  return replStore.isDarkmode
    ? oneDark
    : defaultHighlightStyle.fallback
})

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
        dialect: SQLite,
        tables: props.hintInfo?.tables,
        schema: props.hintInfo?.schema,
      }),

      SQLExtension.of(sql({
        dialect: SQLite,
        tables: props.hintInfo?.tables,
        schema: props.hintInfo?.schema,
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
  () => replStore.isDarkmode,
  recreateEditor
)

onMounted(initEditor)

onUnmounted(disposeEditor)
</script>

<style lang="scss">
.codemirror-container {
  @apply h-full overflow-y-auto;

  .cm-editor {
    @apply h-full dark:bg-true-gray-900;
  }

  .cm-activeLine {
    @apply dark:bg-true-gray-800;
  }

  .cm-gutters {
    @apply dark:bg-true-gray-900;
  }
}
</style>