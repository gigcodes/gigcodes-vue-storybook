<script setup>
import { computed, inject, ref, useAttrs, watch } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant.js'
import classNames from 'classnames'
import Spinner from '../Spinner'

const props = defineProps({
    modelValue: Boolean,
    disabled: Boolean,
    defaultChecked: Boolean,
    isLoading: Boolean,
    color: String,
    name: String,
    readOnly: Boolean,
    checkedContent: String,
    unCheckedContent: String,
})

const emits = defineEmits(['update:modelValue'])

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const switcherChecked = ref(props.defaultChecked || props.modelValue)

watch(
    () => props.modelValue,
    (value) => {
        if (typeof value !== 'undefined') {
            switcherChecked.value = value
        }
    }
)

const getControlProps = () => {
    let checkedValue = switcherChecked.value

    let checked = { value: checkedValue }

    if (props.defaultChecked) {
        checked.defaultChecked = props.defaultChecked
    }
    return checked
}

const controlProps = computed(getControlProps)

const switcherColor = props.color || `${themeColor}-${primaryColorLevel}`

const { class: className, ...restAttrs } = useAttrs()

const handleChange = () => {
    const nextChecked = !switcherChecked.value
    if (props.disabled || props.readOnly || props.isLoading) {
        return
    }
    if (typeof props.modelValue === 'undefined') {
        switcherChecked.value = nextChecked
        emits('update:modelValue', nextChecked)
    } else {
        emits('update:modelValue', !switcherChecked.value)
    }
}

const switcherClass = computed(() =>
    classNames(
        'switcher',
        {
            [`switcher-checked bg-${switcherColor} dark:bg-${switcherColor}`]:
                switcherChecked.value || controlProps.value.checked,
        },
        { 'switcher-disabled': props.disabled },
        className
    )
)
</script>

<template>
    <label :class="switcherClass" v-bind="restAttrs">
        <input
            type="checkbox"
            :disabled="disabled"
            :readonly="readOnly"
            :name="name"
            v-bind="{ ...controlProps }"
            @change="handleChange"
        />
        <Spinner
            v-if="isLoading"
            :class="
                classNames(
                    'switcher-toggle-loading',
                    switcherChecked ? 'switcher-checked-loading' : 'switcher-uncheck-loading'
                )
            "
        ></Spinner>
        <div v-else class="switcher-toggle" />
        <span class="switcher-content">
            <slot v-if="switcherChecked" name="checked"></slot>
            <slot v-else name="unchecked"></slot>
        </span>
    </label>
</template>

<style scoped></style>
