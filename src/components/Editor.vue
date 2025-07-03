<script setup>
import { Marked } from 'marked'
import { ref, computed, watch } from 'vue'
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
    <div :class="showSettings ? 'settings-panel' : 'settings-panel-small'">
      <div class="show-settings">
        <div @click="toggleShowSettings" class="hamburger-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
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
          placeholder="Start writing"
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
/* Import modern fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.simple-writer-main {
  display: flex;
  flex-direction: row;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.settings-panel {
  display: flex;
  flex-direction: column;
  flex: 1.5;
  min-width: 18em;
  box-sizing: border-box;
}

.settings-panel-small {
  display: flex;
  flex-direction: column;
  flex: 0.1;
  box-sizing: border-box;
}

.show-settings {
  display: flex;
  flex-direction: column;
  padding: 1em 0 1em 1em;
  box-sizing: border-box;
}

.settings-container {
  height: calc(100vh - 4.1em);
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  box-sizing: border-box;
}

.settings-item {
  margin: 0.5em 0 0 0.5em;
  display: flex;
  height: 3em;
  padding-left: 1em;
  padding-right: 1em;
  user-select: none;
  align-items: center;
  /* background: rgb(250, 250, 250); */
  border-radius: 8px;
  border: 1px solid rgb(240, 240, 240);
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.settings-item:hover {
  background: rgb(248, 248, 248);
  border-color: rgb(220, 220, 220);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

label {
  flex: 3;
  align-content: center;
  font-weight: 500;
  font-size: 14px;
  color: rgb(60, 60, 60);
  letter-spacing: 0.01em;
  box-sizing: border-box;
}

.text-input {
  width: 4em;
  height: 25px;
  margin: 0;
  padding: 0 8px;
  text-align: center;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  background: white;
  transition: all 0.2s ease;
}

.text-input:focus {
  outline: none;
  border-color: #5179ff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.text-input:hover {
  border-color: rgb(180, 180, 180);
}

/* Custom checkbox styling */
input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #5179ff;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="checkbox"]:hover {
  transform: scale(1.1);
}

.container {
  display: flex;
  flex: 12;
  padding: 4em 0 3em 0;
}

.editor-component {
  display: flex;
  width: 48%;
  height: calc(100vh - 7em);
  margin: 0 auto;
  box-sizing: border-box;
}

.editor-input {
  padding: 0.5em 0.5em;
  box-sizing: border-box;
}

.preview-container {
  background-color: rgb(252, 252, 252);
  border-left: 1px solid rgb(240, 240, 240);
  padding: 1em;
  box-sizing: border-box;
}

.parsed-markdown {
  overflow-y: auto;
  flex: 1;
  /* background-color: rgb(252, 252, 252); */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.cm-focused {
  outline: 0 !important;
}

.hamburger-menu {
  flex: 1;
  width: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  user-select: none;
}

.hamburger-menu span {
  width: 24px;
  height: 3px;
  background: #5179ff;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.hamburger-menu:hover span {
  background: #808080;
}

/* CodeMirror font styling */
.code-mirror {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace !important;
}

/* Vim cursor styling - CodeMirror 6 */
.cm-fat-cursor {
  background-color: #5179ff !important;
  color: white !important;
  border: none !important;
  outline: none !important;
}
</style>