import Alert from './components/ui/Alert'
import type { App } from 'vue'

import './assets/styles/app.css'

export default {
    install: (app: App) => {
        app.component('Alert', Alert)
    },
}

export { Alert }
