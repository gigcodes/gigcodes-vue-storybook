<script setup>
import { computed, inject, provide, useAttrs } from 'vue'
import { DEFAULT_CONFIG, LAYOUT, SIZES } from '@/components/ui/utils/constant.js'
import classNames from 'classnames'

const { controlSize } = inject('config', DEFAULT_CONFIG)
defineOptions({
    inheritAttrs: false,
})
const props = defineProps({
    layout: {
        type: String,
        default: LAYOUT.VERTICAL,
        validator(value) {
            return [LAYOUT.VERTICAL, LAYOUT.HORIZONTAL, LAYOUT.INLINE].includes(value)
        },
    },
    size: {
        type: String,
        default: SIZES.MD,
        validator(value) {
            return [SIZES.LG, SIZES.SM, SIZES.MD].includes(value)
        },
    },
    labelWidth: { type: [String, Number], default: 100 },
})

provide('form', {
    labelWidth: props.labelWidth,
    layout: props.layout,
    size: computed(() => props.size || controlSize),
})

const { class: className, ...restAttrs } = useAttrs()
</script>
<template>
    <div :class="classNames('form-container', props.layout, className)" v-bind="restAttrs">
        <slot />
    </div>
</template>
