<template>
    <textarea v-if="textArea" v-bind="inputProps" v-model="value" :style="style" @input="updateValue"></textarea>
    <span v-else-if="(slots?.prefix || slots?.suffix) && !textArea" :class="inputWrapperClass">
        <div v-if="slots?.prefix" ref="prefixNode" class="input-suffix-start">
            <slot name="prefix" />
        </div>
        <input v-bind="inputProps" v-model="value" :style="{ ...affixGutterStyle(), ...style }" @input="updateValue" />
        <div v-if="slots?.suffix" ref="suffixNode" class="input-suffix-end">
            <slot name="suffix" />
        </div>
    </span>
    <input
        v-else
        v-bind="inputProps"
        v-model="value"
        :style="{ ...affixGutterStyle(), ...style }"
        @input="updateValue"
    />
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { CONTROL_SIZES, DEFAULT_CONFIG, SIZES } from '../utils/constant'
import { computed, inject, onMounted, ref as reference, useAttrs, useSlots } from 'vue'
import { get, isEmpty, isNil } from 'lodash'
import classNames from 'classnames'

const { class: className, style, ...restAttrs } = useAttrs()

const props = defineProps({
    asElement: {
        type: String,
        default: 'input',
    },
    type: {
        type: String,
        default: 'text',
    },
    size: {
        type: String,
        validator(value) {
            return [SIZES.LG, SIZES.SM, SIZES.MD].includes(value)
        },
    },
    invalid: Boolean,
    modelValue: [String, Number],
    unstyle: Boolean,
    form: Object,
    field: Object,
})

const emits = defineEmits(['update:modelValue'])

const updateValue = (e) => {
    emits('update:modelValue', e.target.value)
}

const value = reference(props.modelValue)

const prefixGutter = reference(0)
const suffixGutter = reference(0)
const { themeColor, controlSize, primaryColorLevel, direction } = inject('config', DEFAULT_CONFIG)
const formControlSize = inject('form', {})?.size
const inputGroupSize = inject('inputGroup', {})?.size

const textArea = props.type === 'textarea'

const inputSize = props.size || inputGroupSize || formControlSize || controlSize

const isInvalid = computed(() => {
    let validate = false
    if (!isEmpty(props.form)) {
        const { touched, errors } = props.form
        const touchedField = get(touched, props.field.name)
        const errorField = get(errors, props.field.name)
        validate = touchedField && errorField
    }
    if (typeof props.invalid === 'boolean') {
        validate = props.invalid
    }
    return validate
})

const slots = useSlots()

const inputDefaultClass = 'input'
const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`
const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`
const inputWrapperClass = `input-wrapper ${props.prefix || props.suffix ? className : ''}`
const inputClass = classNames(
    inputDefaultClass,
    !textArea && inputSizeClass,
    !isInvalid.value && inputFocusClass,
    !slots.prefix && !slots.suffix ? className : '',
    props.disabled && 'input-disabled',
    isInvalid.value && 'input-invalid',
    textArea && 'input-textarea'
)
const prefixNode = reference(null)
const suffixNode = reference(null)

const getAffixSize = () => {
    if (!prefixNode.value && !suffixNode.value) return

    const prefixNodeWidth = prefixNode?.value?.offsetWidth
    const suffixNodeWidth = suffixNode?.value?.offsetWidth

    if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) return

    if (prefixNodeWidth) prefixGutter.value = prefixNodeWidth

    if (suffixNodeWidth) suffixGutter.value = suffixNodeWidth
}

onMounted(() => getAffixSize())

const remToPxConvertion = (pixel) => 0.0625 * pixel

const affixGutterStyle = () => {
    const leftGutter = `${remToPxConvertion(prefixGutter.value) + 1}rem`
    const rightGutter = `${remToPxConvertion(suffixGutter.value) + 1}rem`
    const gutterStyle = {}

    if (direction === 'ltr') {
        if (slots.prefix) {
            gutterStyle.paddingLeft = leftGutter
        }

        if (slots.suffix) {
            gutterStyle.paddingRight = rightGutter
        }
    }

    if (direction === 'rtl') {
        if (slots.prefix) {
            gutterStyle.paddingRight = leftGutter
        }

        if (slots.suffix) {
            gutterStyle.paddingLeft = rightGutter
        }
    }

    return gutterStyle
}

const ref = reference()

const inputProps = {
    className: !props.unstyle ? inputClass : '',
    disabled: props.disabled,
    type: props.type,
    ref,
    ...props.field,
    ...restAttrs,
}

defineExpose({ prefixNode, suffixNode })
</script>
