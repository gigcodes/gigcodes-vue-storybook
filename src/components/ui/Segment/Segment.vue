<template>
    <div :class="classNames('segment', className)" v-bind="restAttrs">
        <slot />
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { inject, provide, useAttrs, ref as reference, computed } from 'vue'
import { DEFAULT_CONFIG, SELECTION_TYPE } from '../utils/constant'
import classNames from 'classnames'

const props = defineProps({
    modelValue: [Array, String],
    selectionType: {
        type: String,
        default: SELECTION_TYPE.SINGLE,
        validator(value) {
            return [SELECTION_TYPE.SINGLE, SELECTION_TYPE.MULTIPLE].includes(value)
        },
    },
    size: String,
})

const emits = defineEmits(['update:modelValue'])

const { class: className, ...restAttrs } = useAttrs()

const formControlSize = inject('form', {})?.size
const inputGroupSize = inject('inputGroup', {})?.size
const { controlSize } = inject('config', DEFAULT_CONFIG)
const selectedValue = reference(props.modelValue)

const onActive = (itemValue) => {
    selectedValue.value = itemValue
    emits('update:modelValue', selectedValue.value)
}

const onDeactivate = (itemValue) => {
    if (props.selectionType === SELECTION_TYPE.MULTIPLE) {
        selectedValue.value = selectedValue.value.filter((val) => val !== itemValue)
        emits('update:modelValue', selectedValue.value)
    }
}

const segmentValue = computed(() => {
    if (props.selectionType === SELECTION_TYPE.SINGLE) {
        if (props.modelValue && typeof props.modelValue === 'string') {
            return [props.modelValue]
        }

        if (props.modelValue && Array.isArray(props.modelValue)) {
            return props.modelValue
        }
        return []
    } else {
        return props.modelValue ?? []
    }
})
provide('segment', {
    value: segmentValue,
    onActive,
    onDeactivate,
    selectionType: props.selectionType,
    size: computed(() => props.size || inputGroupSize || formControlSize || controlSize),
})
</script>
