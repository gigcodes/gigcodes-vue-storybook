<script setup>
import { provide, toRefs, useAttrs } from 'vue'
import classNames from 'classnames'

const props = defineProps({
    modelValue: [String, Number],
    variant: {
        type: String,
        default: 'underline',
        validator(val) {
            return ['underline', 'pill'].includes(val)
        },
    },
})

const { class: className, ...restAttrs } = useAttrs()
const tabsClass = classNames('tabs', className)
const emits = defineEmits(['update:modelValue'])

const updateModelValue = (value) => emits('update:modelValue', value)
const propsToRefs = toRefs(props)

provide('tabs', {
    emits: updateModelValue,
    variant: propsToRefs.variant,
    modelValue: propsToRefs.modelValue,
})
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <div :class="tabsClass" v-bind="restAttrs">
        <slot />
    </div>
</template>
