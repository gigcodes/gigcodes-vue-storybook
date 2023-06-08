import { createApp } from 'vue'
import './assets/styles/app.css'
import App from './App.vue'
import { VTooltip } from 'floating-vue'

const app = createApp(App)
app.directive('tooltip', VTooltip)

app.mount('#app')
