<script setup>
import { inject, ref, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import classNames from 'classnames'

const getDayTabIndex = ({ focusable, hasValue, selected, firstInMonth }) => {
    if (!focusable) {
        return -1
    }

    if (hasValue) {
        return selected ? 0 : -1
    }

    return firstInMonth ? 0 : -1
}
const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)
defineOptions({
    inheritAttrs: false,
})
const emit = defineEmits(['mouseenter', 'mousedown'])
const { class: className, ...rest } = useAttrs()
const props = defineProps({
    focusable: Boolean,
    hasValue: Boolean,
    selected: Boolean,
    firstInMonth: Boolean,
    disabled: Boolean,
    isToday: Boolean,
    inRange: Boolean,
    weekend: Boolean,
    outOfMonth: Boolean,
    hideOutOfMonthDates: Boolean,
    firstInRange: Boolean,
    lastInRange: Boolean,
    renderDay: Function,
    mousedown: Function,
    value: [String, Date, Number],
})

const button = ref(null)

defineExpose({
    focus: () => button.value?.focus(),
    disabled: props.disabled,
})
</script>
<template>
    <button
        v-bind="rest"
        ref="button"
        type="button"
        :disabled="disabled"
        :tabIndex="
            getDayTabIndex({
                focusable,
                hasValue,
                selected,
                firstInMonth,
            })
        "
        :class="
            classNames(
                'date-picker-cell-content',
                props.disabled && 'date-picker-cell-disabled',
                props.isToday && `border border-${themeColor}-${primaryColorLevel}`,
                props.weekend && !props.disabled && 'date-picker-cell-weekend',
                props.outOfMonth && !props.disabled && 'date-picker-other-month',
                props.outOfMonth && props.hideOutOfMonthDates && 'd-none',
                !props.outOfMonth && !props.disabled && !props.selected && 'date-picker-cell-current-month',
                !props.disabled && !props.selected && !props.inRange && 'date-picker-cell-hoverable',
                props.selected && !props.disabled && `bg-${themeColor}-${primaryColorLevel} text-gray-100`,
                props.inRange &&
                    !props.disabled &&
                    !props.firstInRange &&
                    !props.lastInRange &&
                    !props.selected &&
                    `bg-${themeColor}-${primaryColorLevel} bg-opacity-10`,
                !props.inRange && !props.firstInRange && !props.lastInRange && 'rounded-lg',
                props.firstInRange &&
                    !props.disabled &&
                    'ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg',
                props.lastInRange &&
                    !props.disabled &&
                    'ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg',
                className
            )
        "
        @mouseenter="(event) => emit('mouseenter', { event, value })"
        @mousedown="mousedown"
    >
        {{ typeof renderDay === 'function' ? renderDay(value) : value?.getDate() }}
    </button>
</template>
