<script setup>
import ToastWrapper from './ToastWrapper.vue'
import { createComponent, createNotification } from './helpers/mount-component.js'
import { isVNode } from 'vue'

const defaultWrapperId = 'default'
const wrappers = new Map()

const castPlacment = (placement) => {
    if (/\top\b/.test(placement)) {
        return 'top-full'
    }

    if (/\bottom\b/.test(placement)) {
        return 'bottom-full'
    }
}

const createWrapper = (wrapperId, props) => {
    const wrapper = createComponent(ToastWrapper, props, document.body)

    wrappers.set(wrapperId || defaultWrapperId, wrapper)
    return wrapper
}

function getWrapper(wrapperId) {
    if (wrappers.size === 0) {
        return null
    }
    return wrappers.get(wrapperId || defaultWrapperId)
}

const push = (message, options) => {
    let id = options.placement
    if (options.block) {
        id = castPlacment(options.placement)
    }

    let wrapper = getWrapper(id)

    if (wrapper?.exposed) {
        return wrapper.exposed.push(message)
    }

    const wrapperRef = createWrapper(id ?? '', options)
    wrapperRef?.exposed.push(message)
    return wrapperRef
}

const remove = (key) => {
    wrappers.forEach((elm) => elm.exposed.remove(key))
}

const removeAll = () => {
    wrappers.forEach((elm) => elm.exposed.removeAll())
}

const defaultOptions = {
    placement: 'top-end',
    offsetX: 30,
    offsetY: 30,
    transitionType: 'scale',
    block: false,
}

const toast = (message, options = defaultOptions) => push(message, options)
const success = (message, title = 'Success', options = defaultOptions) =>
    push(isVNode(message) ? message : createNotification(message, 'success', title), options)
const error = (message, title = 'Info', options = defaultOptions) =>
    push(isVNode(message) ? message : createNotification(message, 'info', title), options)
const danger = (message, title = 'Danger', options = defaultOptions) =>
    push(isVNode(message) ? message : createNotification(message, 'danger', title), options)
const warning = (message, title = 'Warning', options = defaultOptions) =>
    push(isVNode(message) ? message : createNotification(message, 'warning', title), options)

defineExpose({ toast, success, error, danger, warning, remove, removeAll })
</script>
