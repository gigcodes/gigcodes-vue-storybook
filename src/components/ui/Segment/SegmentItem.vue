<template>
    <button
        v-if="!hasSlotComponentType"
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
        <slot />
    </button>
    <slot
        v-else
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
import { computed, inject, useAttrs, useSlots } from 'vue'
import { CONTROL_SIZES, SIZES } from '../utils/constant'

const props = defineProps({
    value: String,
    disabled: {
        type: Boolean,
        default: false,
    },
})

const { size, value, onActive, onDeactivate, selectionType } = inject('segment', null)
const { class: className, ...restAttrs } = useAttrs()
const active = computed(() => value.value.includes(props.value))

const slots = useSlots()

const hasSlotComponentType = slots.default()?.filter((item) => typeof item.type !== 'symbol').length

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
                const nextValue = [...value.value, ...[props.value]]
                onActive(nextValue)
            }
        } else if (selectionType === 'multiple') {
            onDeactivate(props.value)
        }
    }
}
</script>
