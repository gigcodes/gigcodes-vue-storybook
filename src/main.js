import { createApp } from 'vue'
import './assets/styles/app.css'
import App from './App.vue'
import GCUI from '..'

const app = createApp(App)
app.use(GCUI)
app.mount('#app')
