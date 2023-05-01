<template>
    <div>toast</div>
</template>
<script setup>
import { PLACEMENT, TRANSITION_TYPE } from '../utils/constant'
import { ref as reference } from 'vue'

const props = defineProps({
    placement: {
        type: String,
        default: PLACEMENT.TOP_END,
        validator(value) {
            return [
                PLACEMENT.TOP_START,
                PLACEMENT.TOP_CENTER,
                PLACEMENT.TOP_END,
                PLACEMENT.BOTTOM_START,
                PLACEMENT.BOTTOM_CENTER,
                PLACEMENT.BOTTOM_END,
            ].includes(value)
        },
    },
    offsetX: {
        type: [Number, String],
        default: 30,
    },
    offsetY: {
        type: [Number, String],
        default: 30,
    },
    transitionType: {
        type: String,
        default: TRANSITION_TYPE.SCALE,
        validator(value) {
            return [TRANSITION_TYPE.SCALE, TRANSITION_TYPE.FADE].includes(value)
        },
    },
    block: {
        type: Boolean,
        default: false,
    },
})

const useMessages = (msgKey) => {
    let messages = reference([])

    const getKey = (key) => {
        if (typeof key === 'undefined' && messages.value.length) {
            key = messages.value[messages.value.length - 1].key
        }
        return key
    }

    const push = (message) => {
        const key = msgKey || '_' + Math.random().toString(36).substr(2, 12)
        messages.value = [...messages.value, { key, visible: true, node: message }]
        return key
    }

    const removeAll = () => {
        messages.value = messages.value.map((msg) => ({ ...msg, visible: false }))
        setTimeout(() => {
            messages.value = []
        }, 50)
    }

    const remove = (key) => {
        messages.value = messages.value.map((elm) => {
            if (elm.key === getKey(key)) {
                elm.visible = false
            }
            return elm
        })

        setTimeout(() => {
            messages.value = messages.value.filter((msg) => msg.visible)
        }, 50)
    }
    return { messages, push, removeAll, remove }
}
</script>
