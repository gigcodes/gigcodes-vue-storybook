<script setup>
import { CONTROL_SIZES, DEFAULT_CONFIG, LAYOUT, SIZES } from '@/components/ui/utils/constant.js'
import { computed, inject, useAttrs, useSlots } from 'vue'
import classNames from 'classnames'
import { Motion, Presence } from 'motion/vue'

defineOptions({
    inheritAttrs: false,
})
const props = defineProps({
    layout: {
        type: String,
        default: LAYOUT.VERTICAL,
        validator(value) {
            return [LAYOUT.VERTICAL, LAYOUT.HORIZONTAL, LAYOUT.INLINE].includes(value)
        },
    },
    size: {
        type: String,
        default: SIZES.MD,
        validator(value) {
            return [SIZES.LG, SIZES.SM, SIZES.MD].includes(value)
        },
    },
    labelWidth: { type: [String, Number] },
    errorMessage: String,
    invalid: Boolean,
    asterisk: Boolean,
    htmlFor: String,
    label: String,
    labelClass: String,
})

const { controlSize } = inject('config', DEFAULT_CONFIG)
const formContext = inject('form', null)

const formItemLabelHeight = computed(() => props.size || formContext?.size?.value || controlSize)
const formItemLabelWidth = computed(() => props.labelWidth || formContext?.labelWidth)
const formItemLayout = computed(() => props.layout || formContext?.layout)

const getFormLabelLayoutClass = () => {
    switch (formItemLayout.value) {
        case LAYOUT.HORIZONTAL:
            return props.label
                ? `h-${CONTROL_SIZES[formItemLabelHeight.value]} ${props.label && 'ltr:pr-2 rtl:pl-2'}`
                : 'ltr:pr-2 rtl:pl-2'
        case LAYOUT.VERTICAL:
            return `mb-2`
        case LAYOUT.INLINE:
            return `h-${CONTROL_SIZES[formItemLabelHeight.value]} ${props.label && 'ltr:pr-2 rtl:pl-2'}`
        default:
            break
    }
}

const { class: className, style, ...restAttrs } = useAttrs()

const formItemClass = computed(() => classNames('form-item', formItemLayout, className, props.invalid ? 'invalid' : ''))

const formLabelClass = computed(() =>
    classNames('form-label', props.label && getFormLabelLayoutClass(), props.labelClass)
)

const formLabelStyle = () => {
    if (formItemLayout.value === LAYOUT.HORIZONTAL) {
        return { ...style, ...{ minWidth: formItemLabelWidth } }
    }

    return { ...style }
}

const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 }
const exitStyle = { opacity: 0, marginTop: -10 }
const initialStyle = exitStyle

const slots = useSlots()
</script>

<template>
    <div :class="formItemClass" v-bind="restAttrs">
        <label :for="htmlFor" :class="formLabelClass" :style="formLabelStyle()">
            <span v-if="asterisk" class="text-red-500 ltr:mr-1 rtl:ml-1">*</span>
            {{ label }}
            <span v-if="slots.extra"><slot name="extra" /></span>
        </label>
        <div :class="formItemLayout === LAYOUT.HORIZONTAL ? 'w-full flex flex-col justify-center relative' : ''">
            <slot />
            <Presence>
                <Motion
                    :initial="initialStyle"
                    :animate="enterStyle"
                    :exit="exitStyle"
                    :transition="{ duration: 0.15, easing: 'ease' }"
                >
                    <template v-if="invalid">
                        {{ errorMessage }}
                    </template>
                </Motion>
            </Presence>
        </div>
    </div>
</template>
