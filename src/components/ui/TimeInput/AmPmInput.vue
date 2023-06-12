<script setup>
import { ref, useAttrs, watch } from 'vue'
import classNames from 'classnames'

const props = defineProps({
    amLabel: String,
    pmLabel: String,
    modelValue: String,
    change: Function,
    disabled: Boolean,
})
const emit = defineEmits(['focus', 'change'])

defineOptions({
    inheritAttrs: false,
})

const inputRef = ref(null)

const handleClick = (event) => {
    event.stopPropagation()
    inputRef.value?.select()
}

const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
        emit('change', { value: props.value === props.amLabel ? props.pmLabel : props.amLabel, triggerShift: true })
    }
}

const handleFocus = (event) => {
    emit('focus', event)
    inputRef.value?.select()
}

const handleChange = (event) => {
    const lastInputVal = event.target.value.slice(-1).toLowerCase()

    if (lastInputVal === 'p') {
        event.preventDefault()
        emit('change', { value: props.pmLabel, triggerShift: true })
        return
    }

    if (lastInputVal === 'a') {
        event.preventDefault()
        emit('change', { value: props.amLabel, triggerShift: true })
        return
    }
    emit('change', { value: props.modelValue?.toString(), triggerShift: true })
}
const meridian = ref(props.modelValue)

watch(
    () => props.modelValue,
    (val) => (meridian.value = val)
)
const { class: className, ...restAttrs } = useAttrs()
defineExpose({ focus: () => inputRef.value?.focus(), select: () => inputRef.value?.select() })
</script>

<template>
    <input
        ref="inputRef"
        v-model="meridian"
        type="text"
        :class="classNames('time-input-field', 'am-pm-input', className)"
        :disabled="disabled"
        v-bind="restAttrs"
        @click="handleClick"
        @focus="handleFocus"
        @keydown="handleKeyDown"
        @input="handleChange"
    />
</template>
