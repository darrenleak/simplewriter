<script setup>
import { Marked } from 'marked'
import { ref } from 'vue'

const markdown = ref('')
const parsed = ref('')

function textInputChanged() {
  parsed.value = new Marked().parse(markdown.value)
  console.log('Hello there this is a test')
}
</script>
<template>
  <div class="container">
    <textarea class="textArea" @keyup="textInputChanged" v-model="markdown" autofocus></textarea>
    <div class="parsedMarkdown" v-html="parsed"></div>
  </div>
</template>

<style>
.container {
  display: flex;
}

.textArea {
  height: 100vh;
  flex-grow: 1;
  border: 0;
  outline: none;
}

.parsedMarkdown {
  height: 100vh;
  overflow-y: auto;
  flex-grow: 1;
}
</style>
