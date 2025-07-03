import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCodemirror from 'vue-codemirror'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Configure vue-codemirror globally with empty extensions to override default basicSetup
app.use(VueCodemirror, {
  extensions: []
})

app.mount('#app')
