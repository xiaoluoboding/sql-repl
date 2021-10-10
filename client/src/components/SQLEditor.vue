<template>
  <div class="editor" ref="editorRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import 'codemirror/addon/search/searchcursor'
import CodeMirror from 'codemirror'
import './codemirror.css'

// addon
import 'codemirror/addon/comment/comment.js'
// @ts-ignore
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/show-hint.js'
// @ts-ignore
import 'codemirror/addon/hint/sql-hint.js'

const editorRef = ref()
const cm = ref()

const initEditor = () => {
  cm.value = CodeMirror(editorRef.value, {
    value: '',
    tabSize: 2,
    lineNumbers: true,
    mode: 'text/x-sql',
    hintOptions: {
      tables: {
        employees: ['id', 'name', 'designation', 'manager', 'hired_on', 'salary', 'commission', 'dept']
      }
    }
  })
}

onMounted(() => {
  initEditor()

  setTimeout(() => {
    cm.value.refresh()
  }, 50)

  nextTick(() => {
    cm.value.focus()
  })
})
</script>

<style lang="scss">
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.CodeMirror {
  font-family: var(--font-code);
  line-height: 1.5;
  height: 100%;
}
</style>