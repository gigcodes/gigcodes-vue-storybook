<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { computed, inject, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant'
import classNames from 'classnames'

const props = defineProps({
    readOnly: Boolean,
    disabled: Boolean,
    color: String,
    name: String,
    modelValue: [Boolean, String, Number],
    field: Boolean,
    value: [Boolean, String, Number],
    vertical: Boolean,
})
const emits = defineEmits(['update:modelValue'])

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const { class: className, ...restAttrs } = useAttrs()

const groupValue = inject('value', undefined)
const color = inject('color', props.color)
const radioGutter = inject('radioGutter', undefined)
const onGroupChange = inject('onGroupChange', undefined)
const disabledContext = inject('disabled', props.disabled)
const verticalContext = inject('vertical', props.vertical)

const radioColor = color || `${themeColor}-${primaryColorLevel}`

const controlProps = computed(() => {
    return {
        checked:
            typeof groupValue !== 'undefined' ? groupValue.value === props.value : props.modelValue === props.value,
    }
})

const onRadioChange = () => {
    if (disabledContext || props.readOnly) {
        return
    }
    emits('update:modelValue', props.value)
    onGroupChange?.(props.value)
}
</script>
<template>
    <label
        :class="
            classNames(
                'radio-label',
                { disabled: disabledContext },
                className,
                `inline-flex`,
                `${radioGutter ? 'm' + (verticalContext ? 'b-' : 'r-') + radioGutter : ''}`
            )
        "
        v-bind="restAttrs"
    >
        <input
            ref="radioRef"
            :class="classNames(`radio text-${radioColor}`, { disabled: disabledContext })"
            type="radio"
            :disabled="disabledContext"
            :readonly="readOnly"
            :name="name"
            v-bind="controlProps"
            :value="value"
            @click="onRadioChange"
        />
        <span :class="classNames({ 'ltr:ml-2 rtl:mr-2': true, 'opacity-50': disabledContext })">
            <slot />
        </span>
    </label>
</template>
