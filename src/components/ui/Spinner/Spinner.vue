<template>
    <component :is="indicator" ref="reference" :class="spinnerClass" :style="spinnerStyle" v-bind="restAttrs" />
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { useAttrs, ref as reference, inject } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import classNames from 'classnames'

const { class: className, ...restAttrs } = useAttrs()
const ref = reference(null)
const props = defineProps({
    size: {
        type: [String, Number],
        default: 20,
    },
    color: String,
    isSpinning: {
        type: Boolean,
        default: true,
    },
    enableTheme: {
        type: Boolean,
        default: true,
    },
    indicator: {
        type: Function,
        default: ArrowPathIcon,
    },
})

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const spinnerColor = props.color || (props.enableTheme && `${themeColor}-${primaryColorLevel}`)

const spinnerStyle = {
    height: props.size,
    width: props.size,
}

const spinnerClass = classNames(props.isSpinning && 'animate-spin', spinnerColor && `text-${spinnerColor}`, className)

defineExpose([ref])
</script>
