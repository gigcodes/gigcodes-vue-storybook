<template></template>
<script setup>
import useWindowSize from '../utils/useWindowSize.js'
import { ref, toRefs, useAttrs } from 'vue'
import { theme } from 'twin.macro'
import classNames from 'classnames'

const props = defineProps({
    closable: {
        type: Boolean,
        default: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
    overlayClassName: String,
    width: {
        type: [String, Number],
        default: 520,
    },
    height: [String, Number],
    portalClassName: String,
    contentClassName: String,
    closeTimeoutMS: {
        type: Number,
        default: 150,
    },
    bodyOpenClassName: Number,
})

const currentSize = useWindowSize()

const { class: className, style, ...restAttrs } = useAttrs()

const { width, height } = toRefs(props)

const contentStyle = ref({
    content: {
        inset: 'unset',
    },
    ...style,
})

if (width.value !== undefined) {
    contentStyle.value.content.width = width.value
    if (currentSize.width <= parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ''))) {
        contentStyle.value.content.width = 'auto'
    }
}
if (height.value !== undefined) {
    contentStyle.value.content.height = height.value
}

const defaultDialogContentClass = 'dialog-content'

const dialogClass = classNames(defaultDialogContentClass, props.contentClassName)
</script>
