import { h, render } from 'vue'
import Notification from '@/components/ui/Notification'

export function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
}

export function createComponent(component, props, parentContainer, slots = {}) {
    const vNode = h(component, props, slots)
    render(vNode, parentContainer)

    return vNode.component
}

export function createNotification(message, type, title) {
    return h(Notification, {
        type,
        message,
        title,
    })
}
