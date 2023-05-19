import Alert from '@/components/ui/Alert'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Buttons'
import type { App } from 'vue'

import './assets/styles/app.css'

export default {
    install: (app: App) => {
        app.component('Alert', Alert)
        app.component('Tag', Tag)
        app.component('Button', Button)
    },
}

export { Alert, Tag, Button }
