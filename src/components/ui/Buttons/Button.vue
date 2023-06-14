<template>
    <button v-bind="restAttrs" :disabled="disabled || loading" :class="classes" @click="(e) => emit('emit', e)">
        <span v-if="loading && slots.default" class="flex items-center justify-center">
            <Spinner :enable-theme="false" class="mr-1" />
            <slot />
        </span>
        <Spinner v-if="slots.icon && !slots.default && loading" :enable-theme="false" />
        <slot v-if="!slots.default && !loading" name="icon" />
        <span v-if="slots.icon && slots.default && !loading" class="flex items-center justify-center">
            <span class="text-lg">
                <slot name="icon" />
            </span>
            <span class="ltr:ml-1 rtl:mr-1"><slot /></span>
        </span>

        <slot v-if="!slots.icon && slots.default && !loading" />
    </button>
</template>
<script setup>
import { computed, inject, useAttrs, useSlots } from 'vue'
import { CONTROL_SIZES, DEFAULT_CONFIG, SIZES } from '../utils/constant'
import Spinner from '../Spinner'
import useColorLevel from '../utils/useColorLevel'
import classNames from 'classnames'

const { class: className, ...restAttrs } = useAttrs()
const slots = useSlots()
const emit = defineEmits(['click'])
defineOptions({
    inheritAttrs: false,
})
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    block: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    shape: {
        type: String,
        default: 'round',
        validator(value) {
            return ['round', 'circle', 'none'].includes(value)
        },
    },
    size: {
        type: String,
        validator(value) {
            return [SIZES.LG, SIZES.SM, SIZES.XS, SIZES.MD].includes(value)
        },
    },
    variant: {
        type: String,
        default: 'default',
        validator(value) {
            return ['solid', 'twoTone', 'plain', 'default'].includes(value)
        },
    },
    color: {
        type: String,
        default: '',
    },
})

const { themeColor, controlSize, primaryColorLevel } = inject('config', DEFAULT_CONFIG)
const formControlSize = inject('form', {})?.size
const inputGroupSize = inject('inputGroup', {})?.size
const defaultClass = 'button'
const sizeIconClass = 'inline-flex items-center justify-center'

const splitColor = computed(() => props.color.split('-'))

const buttonSize = computed(() => props.size || inputGroupSize || formControlSize || controlSize)
const buttonColor = computed(() => splitColor.value[0] || themeColor)
const buttonColorLevel = computed(() => splitColor.value[1] || primaryColorLevel)

const [increaseLevel, decreaseLevel] = useColorLevel(buttonColorLevel)

const getButtonSize = computed(() => {
    let sizeClass = ''
    switch (buttonSize.value) {
        case SIZES.LG:
            sizeClass = classNames(
                `h-${CONTROL_SIZES.lg}`,
                props.icon && !slots.default ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl` : 'px-8 py-2 text-base'
            )
            break
        case SIZES.SM:
            sizeClass = classNames(
                `h-${CONTROL_SIZES.sm}`,
                props.icon && !slots.default ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg` : 'px-3 py-2 text-sm'
            )
            break
        case SIZES.XS:
            sizeClass = classNames(
                `h-${CONTROL_SIZES.xs}`,
                props.icon && !slots.default ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base` : 'px-3 py-1 text-xs'
            )
            break
        default:
            sizeClass = classNames(
                `h-${CONTROL_SIZES.md}`,
                props.icon && !slots.default ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl` : 'px-8 py-2'
            )
            break
    }
    return sizeClass
})

const disabledClass = 'opacity-50 cursor-not-allowed'

const solidColor = () => {
    const btn = {
        bgColor: props.active
            ? `bg-${buttonColor.value}-${increaseLevel}`
            : `bg-${buttonColor.value}-${buttonColorLevel.value}`,
        textColor: 'text-white',
        hoverColor: props.active ? '' : `hover:bg-${buttonColor.value}-${decreaseLevel}`,
        activeColor: `active:bg-${buttonColor.value}-${increaseLevel}`,
    }
    return getBtnColor(btn)
}

const twoToneColor = () => {
    const btn = {
        bgColor: props.active
            ? `bg-${buttonColor.value}-200 dark:bg-${buttonColor.value}-50`
            : `bg-${buttonColor.value}-50 dark:bg-${buttonColor.value}-500 dark:bg-opacity-20`,
        textColor: `text-${buttonColor.value}-${buttonColorLevel.value} dark:text-${buttonColor.value}-50`,
        hoverColor: props.active
            ? ''
            : `hover:bg-${buttonColor.value}-100 dark:hover:bg-${buttonColor.value}-500 dark:hover:bg-opacity-30`,
        activeColor: `active:bg-${buttonColor.value}-200 dark:active:bg-${buttonColor.value}-500 dark:active:bg-opacity-40`,
    }
    return getBtnColor(btn)
}

const defaultColor = () => {
    const btn = {
        bgColor: props.active
            ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500`
            : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
        textColor: `text-gray-600 dark:text-gray-100`,
        hoverColor: props.active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
        activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
    }
    return getBtnColor(btn)
}

const plainColor = () => {
    const btn = {
        bgColor: props.active ? `bg-gray-100 dark:bg-gray-500` : 'bg-transparent border border-transparent',
        textColor: `text-gray-600 dark:text-gray-100`,
        hoverColor: props.active ? '' : `hover:bg-gray-50 dark:hover:bg-gray-600`,
        activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
    }
    return getBtnColor(btn)
}

const getBtnColor = ({ bgColor, hoverColor, activeColor, textColor }) => {
    return `${bgColor} ${props.disabled || props.loading ? disabledClass : hoverColor + ' ' + activeColor} ${textColor}`
}

const btnColor = () => {
    switch (props.variant) {
        case 'solid':
            return solidColor()
        case 'twoTone':
            return twoToneColor()
        case 'plain':
            return plainColor()
        case 'default':
            return defaultColor()
        default:
            return defaultColor()
    }
}

const classes = computed(() =>
    classNames(
        defaultClass,
        btnColor(),
        `radius-${props.shape}`,
        getButtonSize.value,
        className,
        props.block ? 'w-full' : ''
    )
)
</script>
