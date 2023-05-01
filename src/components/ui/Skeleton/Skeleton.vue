<template>
    <component
        :is="asElement"
        v-bind="rest"
        ref="ref"
        :class="
            classNames(
                'skeleton',
                variant === 'circle' && 'skeleton-circle',
                variant === 'block' && 'skeleton-block',
                animation && 'animate-pulse',
                className
            )
        "
        :style="{
            height: `${height}px`,
            width: `${width}px`,
        }"
    ></component>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { ref as reference, useAttrs } from 'vue'
import classNames from 'classnames'

const ref = reference(null)
defineProps({
    asElement: {
        type: String,
        default: 'span',
    },
    variant: {
        type: String,
        default: 'block',
        validator(value) {
            return ['circle', 'block'].includes(value)
        },
    },
    height: [String, Number],
    width: [String, Number],
    animation: {
        type: Boolean,
        default: true,
    },
})
const { class: className, ...rest } = useAttrs()
defineExpose({ ref })
</script>
