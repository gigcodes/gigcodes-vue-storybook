<template>
    <component
        :is="indicator"
        ref="reference"
        :class="classNames(props.isSpinning && 'animate-spin', spinnerColor && `text-${spinnerColor}`, className)"
        :style="spinnerStyle"
        v-bind="restAttrs"
    />
</template>
<script setup>
import { computed, inject, ref as reference, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import classNames from 'classnames'

const { class: className, ...restAttrs } = useAttrs()
const ref = reference(null)
defineOptions({
    inheritAttrs: false,
})
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

const spinnerColor = computed(() => props.color || (props.enableTheme && `${themeColor}-${primaryColorLevel}`))

const spinnerStyle = computed(() => ({
    height: props.size,
    width: props.size,
}))

defineExpose([ref])
</script>
