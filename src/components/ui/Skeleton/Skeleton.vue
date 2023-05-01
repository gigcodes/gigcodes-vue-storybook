<template>
    <component
        :is="asElement"
        v-bind="rest"
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
            width,
        }"
    ></component>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { computed, useAttrs } from 'vue'
import classNames from 'classnames'

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

const activeStyles = computed(() => {})
</script>
