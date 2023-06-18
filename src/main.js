import { createApp } from 'vue'
import './assets/styles/app.css'
import App from './App.vue'
import { VTooltip } from 'floating-vue'
import VueClickAway from 'vue3-click-away'

const app = createApp(App)
app.directive('tooltip', VTooltip)
app.use(VueClickAway) // Makes 'v-click-away' directive usable in every component

app.mount('#app')
