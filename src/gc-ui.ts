import Alert from './components/ui/Alert'
import {Segment, SegmentItem} from './components/ui/Segment'
import type { App } from 'vue'

import './assets/styles/app.css'  

export default {
    install: (app: App) => {
        app.component('Alert', Alert)
        app.component('Segment', Segment)
        app.component('SegmentItem', SegmentItem)
    },
}
 
export { Alert,Segment,SegmentItem }
      