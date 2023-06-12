<script setup>
import { ref, useAttrs } from 'vue'
import classNames from 'classnames'

const props = defineProps({
    amLabel: String,
    pmLabel: String,
    value: String,
    change: Function,
    setValue: Function,
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
    emit('change', { value: props.value.toString(), triggerShift: true })
}

const { class: className, ...restAttrs } = useAttrs()
defineExpose({ focus: () => inputRef.value?.focus(), select: () => inputRef.value?.select() })
</script>

<template>
    <input
        ref="inputRef"
        type="text"
        :value="value"
        :class="classNames('time-input-field', 'am-pm-input', className)"
        v-bind="restAttrs"
        @click="handleClick"
        @focus="handleFocus"
        @keydown="handleKeyDown"
        @input="handleChange"
    />
</template>
