<template>
    <textarea v-if="textArea" :style="style" v-bind="restAttrs"></textarea>
    <slot v-if="prefix" name="prefix"
        ><div className="input-suffix-start" ref="prefixNode">
            {{ prefix }}
        </div></slot
    >
    <component ref="reference" :style="inputStyle" v-bind="restAttrs" />
    <slot v-if="suffix" name="suffix"
        ><div className="input-suffix-end" ref="suffixNode">
            {{ suffix }}
        </div></slot
    >
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { CONTROL_SIZES, DEFAULT_CONFIG, SIZES } from '../utils/constant'
import { computed, inject, onMounted, ref as reference, useAttrs } from 'vue'
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
    invalid: [Boolean],
    suffix: [String, Node],
    prefix: [String, Node],
    unstyle: {
        type: Boolean,
        default: false,
    },
})

const prefixGutter = reference(0)
const suffixGutter = reference(0)
const { themeColor, controlSize, primaryColorLevel, direction } = inject('config', DEFAULT_CONFIG)
const formControlSize = inject('form')?.size
const inputGroupSize = inject('inputGroup')?.size

const inputSize = props.size || inputGroupSize || formControlSize || controlSize

const fixControlledValue = (val) => {
    if (typeof val === 'undefined' || val === null) {
        return ''
    }
    return val
}

if (props.value) {
    restAttrs.value = fixControlledValue(props.value)
    delete restAttrs.defaultValue
}

const isInvalid = computed(() => {
    let validate = false
    if (!isEmpty(form)) {
        const { touched, errors } = form
        const touchedField = get(touched, field.name)
        const errorField = get(errors, field.name)
        validate = touchedField && errorField
    }
    if (typeof invalid === 'boolean') {
        validate = invalid
    }
    return validate
})

const inputDefaultClass = 'input'
const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`
const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`
const inputWrapperClass = `input-wrapper ${props.prefix || props.suffix ? className : ''}`
const inputClass = classNames(
    inputDefaultClass,
    !props.textArea && inputSizeClass,
    !props.isInvalid && inputFocusClass,
    !props.prefix && !props.suffix ? className : '',
    props.disabled && 'input-disabled',
    props.isInvalid && 'input-invalid',
    props.textArea && 'input-textarea'
)
const prefixNode = reference(null)
const suffixNode = reference(null)

const getAffixSize = computed(() => {
    if (!prefixNode.value && !suffixNode.value) return

    const prefixNodeWidth = prefixNode?.value?.offsetWidth
    const suffixNodeWidth = suffixNode?.value?.offsetWidth

    if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) return

    if (prefixNodeWidth) prefixGutter.value = prefixNodeWidth

    if (suffixNodeWidth) suffixGutter.value = suffixNodeWidth
})
onMounted(() => getAffixSize())

const remToPxConvertion = (pixel) => 0.0625 * pixel

const affixGutterStyle = () => {
    const leftGutter = `${remToPxConvertion(prefixGutter.value) + 1}rem`
    const rightGutter = `${remToPxConvertion(suffixGutter.value) + 1}rem`
    let gutterStyle = {}

    if (direction === 'ltr') {
        if (props.prefix) {
            gutterStyle.paddingLeft = leftGutter
        }

        if (props.suffix) {
            gutterStyle.paddingRight = rightGutter
        }
    }

    if (direction === 'rtl') {
        if (props.prefix) {
            gutterStyle.paddingRight = leftGutter
        }

        if (props.suffix) {
            gutterStyle.paddingLeft = rightGutter
        }
    }

    return gutterStyle
}

const inputStyle = { ...affixGutterStyle(), ...style }

defineExpose({ ref })
</script>
