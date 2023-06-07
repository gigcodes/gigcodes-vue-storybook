<script setup>
import { ref, useAttrs } from 'vue'
import classNames from 'classnames'

const props = defineProps({
    amLabel: String,
    pmLabel: String,
    modelValue: String,
})
const emit = defineEmits(['change', 'update:modelValue', 'focus'])
defineOptions({
    inheritAttrs: false,
})
const inputRef = ref(null)

const handleClick = (event) => {
    event.stopPropagation()
    inputRef.value.select()
}

const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
        emit('change', props.modelValue === props.amLabel ? props.pmLabel : props.amLabel, true)
    }
}

const handleFocus = (event) => {
    emit('focus', event)
    inputRef.value.select()
}

const handleChange = (event) => {
    const lastInputVal = event.target.value.slice(-1).toLowerCase()

    if (lastInputVal === 'p') {
        event.preventDefault()
        emit('change', props.pmLabel, true)
        return
    }

    if (lastInputVal === 'a') {
        event.preventDefault()
        emit('change', props.amLabel, true)
        return
    }

    emit('change', props.modelValue.toString(), true)
}

const { class: className, ...restAttrs } = useAttrs()
</script>

<template>
    <input
        ref="inputRef"
        type="text"
        :value="modelValue"
        :class="classNames('time-input-field', 'am-pm-input', className)"
        v-bind="restAttrs"
        @click="handleClick"
        @focus="handleFocus"
        @keydown="handleKeyDown"
        @change="handleChange"
    />
</template>
