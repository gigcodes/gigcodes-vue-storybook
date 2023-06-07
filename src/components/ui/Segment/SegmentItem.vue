<template>
    <button
        v-if="!custom"
        :class="
            classNames(
                'segment-item segment-item-default',
                active && 'segment-item-active',
                disabled && 'segment-item-disabled',
                getSegmentSize,
                className
            )
        "
        v-bind="restAttrs"
        @click="onSegmentItemClick"
    >
        <slot :value="value" :disabled="disabled" :active="active" :size="size" :segment-click="onSegmentItemClick" />
    </button>
    <slot
        v-else
        :hello="'asd'"
        :value="value"
        :disabled="disabled"
        :active="active"
        :size="size"
        :segment-click="onSegmentItemClick"
    />
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import classNames from 'classnames'
import { computed, inject, useAttrs } from 'vue'
import { CONTROL_SIZES, SIZES } from '../utils/constant'

const props = defineProps({
    value: String,
    disabled: {
        type: Boolean,
        default: false,
    },
    custom: Boolean,
})

const { size, value: modelValue, onActive, onDeactivate, selectionType } = inject('segment', null)
const { class: className, ...restAttrs } = useAttrs()
const active = computed(() => modelValue.value.includes(props.value))

const getSegmentSize = computed(() => {
    let sizeClass = ''
    switch (size.value) {
        case SIZES.LG:
            sizeClass = classNames(`h-${CONTROL_SIZES.lg} md:px-8 py-2 px-4 text-base`)
            break
        case SIZES.SM:
            sizeClass = classNames(`h-${CONTROL_SIZES.sm} px-3 py-2 text-sm`)
            break
        case SIZES.XS:
            sizeClass = classNames(`h-${CONTROL_SIZES.xs} px-3 py-1 text-xs`)
            break
        default:
            sizeClass = classNames(`h-${CONTROL_SIZES.md} md:px-8 py-2 px-4`)
            break
    }
    return sizeClass
})

const onSegmentItemClick = () => {
    if (!props.disabled) {
        if (!active.value) {
            if (selectionType === 'single') {
                onActive([props.value])
            }
            if (selectionType === 'multiple') {
                const nextValue = [...modelValue.value, ...[props.value]]
                onActive(nextValue)
            }
        } else if (selectionType === 'multiple') {
            onDeactivate(props.value)
        }
    }
}
</script>
