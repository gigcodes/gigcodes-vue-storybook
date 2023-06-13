<script setup>
import { ref, useAttrs, computed } from 'vue'
import classNames from 'classnames'
import { clamp, padTime } from './utils'

defineOptions({
    inheritAttrs: false,
})

const { class: className, ...restAttrs } = useAttrs()

delete restAttrs.size

const props = defineProps({
    modelValue: [String, Number],
    withSeparator: Boolean,
    disabled: Boolean,
    max: Number,
    min: Number,
})
const emits = defineEmits(['focus', 'blur', 'update:modelValue', 'change', 'keydown', 'keyup'])
const inputRef = ref(null)
const digitsEntered = ref(0)

const modifiedValue = ref(props.modelValue)
const computedValue = computed({
    get() {
        return props.modelValue
    },
    set() {
        modifiedValue.value = props.modelValue
    },
})

const handleFocus = (event) => {
    emits('focus', event)
    digitsEntered.value = 0
}

const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
        event.preventDefault()
        const padded = padTime(clamp(parseInt(event.currentTarget.value, 10) + 1, props.min, props.max).toString())

        if (props.modelValue !== padded) {
            emits('change', {
                value: padded,
                triggerShift: false,
            })
        }
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault()
        const padded = padTime(clamp(parseInt(event.currentTarget.value, 10) - 1, props.min, props.max).toString())

        if (props.value !== padded) {
            emits('change', {
                value: padded,
                triggerShift: false,
            })
        }
    }
}

const handleBlur = (event) => {
    emits('blur', event)
    if (digitsEntered.value === 1) {
        emits('change', {
            value: event.currentTarget.value,
            triggerShift: false,
        })
    }
}

const handleUpdate = (event) => {
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
        v-model="computedValue"
        type="text"
        inputmode="numeric"
        :class="classNames('time-input-field', className)"
        v-bind="restAttrs"
        :disabled="disabled"
        @input="handleUpdate"
        @click="handleClick"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeyDown"
    />
    <span v-if="withSeparator">:</span>
</template>
