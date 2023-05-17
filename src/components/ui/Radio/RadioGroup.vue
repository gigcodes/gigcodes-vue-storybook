<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import classNames from 'classnames'
import { provide, toRefs, useAttrs } from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    color: String,
    vertical: Boolean,
    disabled: Boolean,
    name: String,
    radioGutter: {
        type: Number,
        default: 3,
    },
})

const emits = defineEmits(['update:modelValue'])

const { class: className, ...restAttrs } = useAttrs()

const radioGroupClass = classNames('radio-group', props.vertical && 'vertical', className)

const onRadioGroupChange = (value) => {
    emits('update:modelValue', value)
}

provide('onGroupChange', onRadioGroupChange)
provide('color', props.color)
provide('radioGutter', props.radioGutter)
provide('value', toRefs(props).modelValue)
provide('disabled', props.disabled)
provide('vertical', props.vertical)
</script>

<template>
    <div :class="radioGroupClass" v-bind="restAttrs"><slot /></div>
</template>

<style scoped></style>
