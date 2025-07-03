<script setup>
import { Marked } from 'marked'
import { ref, computed } from 'vue'
// import 'github-markdown-css/github-markdown-light.css'
import { Codemirror } from 'vue-codemirror'
import { EditorConfig } from '@/general/EditorConfig'

// import { defineComponent } from 'vue'
// import { javascript } from '@codemirror/lang-javascript'
// import { oneDark } from '@codemirror/theme-one-dark'

const showSettings = ref(false)
const markdown = ref('')
const parsed = ref('')
const showPreview = ref(false)
const fontSize = ref(24)
const style = computed(() => ({ 
  display: 'flex', 
  flex: 1,
  fontSize: fontSize.value + 'px',
}))

const config = ref(new EditorConfig())
const extensions = computed(() => config.value.extensions())

function textInputChanged(value) {
  parsed.value = new Marked().parse(value)
}

function toggleShowSettings() {
  showSettings.value = !showSettings.value
}

</script>
<template>
  <div class="simple-writer-main">
    <div class="settings-panel">
      <div @click="toggleShowSettings" class="show-settings">
        Show settings
      </div>
      <div v-if="showSettings" class="settings-container">
        <div class="settings-item">
          <label for="indentWithTab">Indent with tab</label>
          <input type="checkbox" id="indentWithTab" v-model="config.indentWithTab" />
        </div>
        <div class="settings-item">
          <label for="tabSize">Tab Size</label>
          <input type="number" id="tabSize" class="text-input" v-model="config.tabSize" />
        </div>
        <div class="settings-item">
          <label for="useVim">Use Vim</label>
          <input type="checkbox" id="useVim" v-model="config.useVim" />
        </div>
        <div class="settings-item">
          <label for="showPreview">Show Preview</label>
          <input type="checkbox" id="showPreview" v-model="showPreview" />
        </div>
        <div class="settings-item">
          <label for="fontSize">Font size</label>
          <input type="number" id="fontSize" class="text-input" v-model.number="fontSize" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="editor-component editor-input">
        <codemirror
          class="code-mirror"
          :style="style"
          :autofocus="true"
          :indent-with-tab="config.indentWithTab"
          :tab-size="config.tabSize"
          :extensions="extensions"
          @change="textInputChanged"
        />
      </div>
      <div v-if="showPreview" class="editor-component preview-container">
        <div class="parsed-markdown markdown-body" v-html="parsed"></div>
      </div>
    </div>
  </div>
</template>

<style>
.simple-writer-main {
  display: flex;
  flex-direction: row;
}

.settings-panel {
  display: flex;
  flex-direction: column;
  flex: 1.5;
}

.show-settings {
  display: flex;
  height: 4em;
}

.settings-container {
  height: calc(100vh - 4em);
  background-color: rgb(240, 240, 240);
  padding-right: 1em;
}

.settings-item {
  display: flex;
  height: 3em;
  padding-left: 1em;
  user-select: none;
  align-items: center;
}

label {
  flex: 3;
  align-content: center;
}

.text-input {
  width: 4em;
  height: 25px;
  margin: 0;
  padding: 0;
  text-align: center;
}

.container {
  display: flex;
  flex: 12;
  padding: 4em 0 3em 0;
  box-sizing: border-box;
}

.editor-component {
  display: flex;
  width: 48%;
  height: calc(100vh - 7em);
  margin: 0 auto;
  /* border: 1px solid rgb(240, 240, 240); */
}

.editor-input {
  padding: 0.5em 0.5em;
  box-sizing: border-box;
}

.preview-container {
  background-color: rgb(252, 252, 252);
  border: 1px solid rgb(240, 240, 240);
  padding: 1em;
  box-sizing: border-box;
}

.parsed-markdown {
  overflow-y: auto;
  flex: 1;
  background-color: rgb(252, 252, 252);
}

.cm-focused {
  outline: 0 !important;
}
</style>