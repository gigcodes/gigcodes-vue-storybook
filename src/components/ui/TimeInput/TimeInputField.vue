<script setup>
import { ref, useAttrs } from 'vue'
import { clamp, padTime } from './utils/index.js'
import classNames from 'classnames'

defineOptions({
    inheritAttrs: false,
})

const { class: className, ...restAttrs } = useAttrs()

delete restAttrs.size

const props = defineProps({
    modelValue: [String, Number],
    withSeparator: Boolean,
    max: Number,
    min: {
        type: Number,
        default: 0,
    },
})
const emits = defineEmits(['focus', 'blur', 'update:modelValue', 'change'])
const digitsEntered = ref(0)
const inputRef = ref(null)

const handleFocus = (e) => {
    emits('focus', e)
    inputRef.value?.select()
    digitsEntered.value = 0
}

const handleBlur = (e) => {
    emits('blur', e)
    if (digitsEntered.value === 1) {
        emits('change', {
            value: e.currentTarget.value,
            triggerShift: false,
        })
    }
}

const handleClick = (e) => {
    e.stopPropagation()
    inputRef.value?.select()
}

const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault()
        const padded = padTime(clamp(parseInt(e.currentTarget.value, 10) + 1, props.min, props.max).toString())
        if (props.value !== padded) {
            emits('change', {
                value: padded,
                triggerShift: false,
            })
        }
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        const padded = padTime(clamp(parseInt(e.currentTarget.value, 10) - 1, props.min, props.max).toString())

        if (props.value !== padded) {
            emits('change', {
                value: padded,
                triggerShift: true,
            })
        }
    }
}

const handleChange = (event) => {
    digitsEntered.value = digitsEntered.value + 1

    const _val = parseInt(event.currentTarget.value, 10).toString()

    if (_val === '0' && digitsEntered.value === 0) {
        emits('update:modelValue', '00')
        return
    }
    emits('change', {
        value: _val,
        triggerShift: true,
        forceTriggerShift: digitsEntered.value > 1,
    })
}

defineExpose({ focus: () => inputRef.value?.focus(), select: () => inputRef.value?.select() })
</script>
<template>
    <input
        ref="inputRef"
        type="text"
        inputmode="numeric"
        :value="modelValue"
        :class="classNames('time-input-field', className)"
        v-bind="restAttrs"
        @input="handleChange"
        @click="handleClick"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeyDown"
    />
    <span v-if="withSeparator">:</span>
</template>
