<template>
  <div class="codemirror-container" ref="el"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup'
import { schemaCompletion, sql, SQLite } from '@codemirror/lang-sql'
import { autocompletion } from '@codemirror/autocomplete'
import { history } from '@codemirror/history'
import { Compartment } from '@codemirror/state'

export default defineComponent({
  name: 'Codemirror',

  props: ['modelValue'],

  setup (props, { emit }) {
    const { modelValue } = toRefs(props)

    const store = reactive({
      el: ref<Element>(),
      doc: modelValue.value,
      view: ref<EditorView>()
    })

    onMounted(() => {
      EditorView.theme({
        '&.cm-activeLine cm-line': {
          backgroundColor: '#171717'
        }
      })

      const onUpdate = () =>
        EditorView.updateListener.of(({ state }) => {
          store.doc = state.doc.toString()
          emit('update:modelValue', store.doc)
        })

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

          onUpdate()
        ]
      })

      store.view = new EditorView({
        state: editorState,
        parent: store.el
      })
    })

    return {
      ...toRefs(store)
    }
  }
})
</script>

<style lang="scss">
.codemirror-container {
  height: 100%;
  overflow-y: auto;

  .cm-editor {
    .cm-activeLine.cm-line {
      @apply bg-white dark:bg-true-gray-900;
    }
  }

  .cm-gutters {
    @apply bg-gray-50;
    @apply dark:bg-true-gray-800 dark:text-gray-300 dark:border-r-gray-800;
  }

  .cm-activeLineGutter {
    @apply bg-gray-100 dark:bg-true-gray-900;
  }
}
</style>
