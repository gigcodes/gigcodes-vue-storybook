<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { computed, inject, onBeforeMount, ref, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant.js'
import classNames from 'classnames'

const props = defineProps({
    disabled: Boolean,
    readOnly: Boolean,
    defaultChecked: Boolean,
    color: String,
    modelValue: [Boolean, String, Number],
    field: Boolean,
    value: [Boolean, String, Number],
})

const emits = defineEmits(['update:modelValue'])

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const groupValue = inject('value')
const name = inject('name')
const color = inject('color')
const onGroupChange = inject('onGroupChange')

const isChecked = () => {
    if (typeof groupValue !== 'undefined' && typeof props.value !== 'undefined') {
        return groupValue.some((i) => i === props.value)
    }
    return props.modelValue || props.defaultChecked
}

const checkboxChecked = ref(false)

const getControlProps = () => {
    let checkedValue = checkboxChecked.value

    let groupChecked = { checked: checkedValue }
    let singleChecked = { value: props.value }

    if (props.modelValue) {
        singleChecked.checked = props.modelValue
    }

    if (props.field) {
        checkedValue = typeof props.field === 'boolean' ? props.field : props.defaultChecked
        singleChecked = { value: checkedValue, checked: checkedValue }
    }

    if (typeof groupValue !== 'undefined') {
        groupChecked = { checked: groupValue.includes(props.value) }
    }

    if (props.defaultChecked) {
        singleChecked.defaultChecked = props.defaultChecked
    }
    return typeof groupValue !== 'undefined' ? groupChecked : singleChecked
}

const controlProps = computed(getControlProps)

const onCheckboxChange = () => {
    let nextChecked = !checkboxChecked.value

    if (props.disabled || props.readOnly) {
        return
    }

    checkboxChecked.value = nextChecked
    emits('update:modelValue', nextChecked)

    onGroupChange?.(props.value, nextChecked)
}

const checkboxColor = props.color || color || `${themeColor}-${primaryColorLevel}`

const checkboxDefaultClass = `checkbox text-${checkboxColor}`
const labelDefaultClass = `checkbox-label`

const { class: className, ...restAttrs } = useAttrs()

onBeforeMount(() => {
    checkboxChecked.value = isChecked()
})
</script>

<template>
    <label :class="classNames(labelDefaultClass, { disabled: props.disabled }, className)" v-bind="restAttrs">
        <input
            ref="checkboxRef"
            :class="classNames(checkboxDefaultClass, { disabled: props.disabled })"
            type="checkbox"
            :disabled="disabled"
            :readonly="readOnly"
            :name="name"
            v-bind="controlProps"
            @change="onCheckboxChange"
        />
        <span :class="{ 'ltr:ml-2 rtl:mr-2': true, 'opacity-50': disabled }">
            <slot />
        </span>
    </label>
</template>

<style scoped></style>
