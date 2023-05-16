<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { provide, useAttrs } from 'vue'
import classNames from 'classnames'
import { cloneDeep, remove } from 'lodash'
import shallowEqual from '../utils/shallowEqual.js'

const props = defineProps({
    modelValue: Array,
    color: String,
    vertical: Boolean,
    name: String,
})

const emits = defineEmits(['update:modelValue'])

const { class: className, ...restAttrs } = useAttrs()

const checkboxGroupDefaultClass = `inline-flex ${props.vertical ? 'flex-col gap-y-2' : ''}`

const checkBoxGroupClass = classNames(checkboxGroupDefaultClass, className)

const onCheckboxGroupChange = (itemValue, itemChecked) => {
    const nextValue = cloneDeep(props.modelValue) || []
    if (itemChecked) {
        nextValue.push(itemValue)
    } else {
        remove(nextValue, (i) => shallowEqual(i, itemValue))
    }
    emits('update:modelValue', nextValue)
}

provide('onGroupChange', onCheckboxGroupChange)
provide('color', props.color)
provide('name', props.name)
provide('value', props.modelValue)
provide('vertical', props.vertical)
</script>

<template>
    <div :class="checkBoxGroupClass" v-bind="restAttrs"><slot /></div>
</template>

<style scoped></style>
