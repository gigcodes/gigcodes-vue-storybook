<template>
    <textarea v-if="textArea" v-bind="inputProps" :value="modelValue" :style="style" v-on="events"></textarea>
    <span v-else-if="(slots?.prefix || slots?.suffix) && !textArea" :class="inputWrapperClass">
        <div v-if="slots?.prefix" ref="prefixNode" class="input-suffix-start">
            <slot name="prefix" />
        </div>
        asd
        <component
            :is="asElement"
            v-bind="inputProps"
            :value="modelValue"
            :style="{ ...affixGutterStyle, ...style }"
            v-on="events"
        >
            <slot />
        </component>
        <div v-if="slots?.suffix" ref="suffixNode" class="input-suffix-end">
            <slot name="suffix" />
        </div>
    </span>
    <component
        :is="asElement"
        v-else
        v-bind="inputProps"
        :value="modelValue"
        :style="{ ...affixGutterStyle, ...style }"
        v-on="events"
    >
        <slot />
    </component>
</template>
<script setup>
import { CONTROL_SIZES, DEFAULT_CONFIG, SIZES } from '../utils/constant'
import { computed, inject, onMounted, ref, useAttrs, useSlots } from 'vue'
import { get, isEmpty, isNil } from 'lodash'
import classNames from 'classnames'

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

defineOptions({
    inheritAttrs: false,
})

const { class: className, style, ...restAttrs } = useAttrs()

const emits = defineEmits(['update:modelValue', 'focus', 'blur', 'change', 'keydown', 'click', 'keyup'])

const events = {
    click: (e) => emits('click', e.target.value),
    keydown: (e) => emits('keydown', e.target.value),
    keyup: (e) => emits('keyup', e.target.value),
    focus: (e) => emits('focus', e.target.value),
    blur: (e) => emits('blur', e.target.value),
    input: (event) => emits('update:modelValue', event.target.value),
    change: (e) => emits('update:modelValue', e.target.value),
}

const prefixGutter = ref(0)
const suffixGutter = ref(0)
const { themeColor, controlSize, primaryColorLevel, direction } = inject('config', DEFAULT_CONFIG)
const formControlSize = inject('form', {})?.size
const inputGroupSize = inject('inputGroup', {})?.size
const inputSize = computed(() => props.size || inputGroupSize || formControlSize || controlSize)

const textArea = computed(() => props.type === 'textarea')

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
const inputSizeClass = computed(() => `input-${inputSize.value} h-${CONTROL_SIZES[inputSize]}`)
const inputFocusClass = computed(
    () =>
        `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`
)
const inputWrapperClass = computed(() => `input-wrapper ${props.prefix || props.suffix ? className : ''}`)
const inputClass = classNames(
    inputDefaultClass,
    !textArea.value && inputSizeClass.value,
    !isInvalid.value && inputFocusClass.value,
    !slots.prefix && !slots.suffix ? className : '',
    props.disabled && 'input-disabled',
    isInvalid.value && 'input-invalid',
    textArea.value && 'input-textarea'
)
const prefixNode = ref(null)
const suffixNode = ref(null)

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

const affixGutterStyle = computed(() => {
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
})

const inputProps = {
    className: !props.unstyle ? inputClass : '',
    disabled: props.disabled,
    type: props.type,
    ...props.field,
    ...restAttrs,
}

defineExpose({ prefixNode, suffixNode })
</script>
