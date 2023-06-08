<script setup>
import { computed, h, inject, ref, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import { getMonthDays, getWeekdaysNames, isSameDate } from '@/components/ui/DatePicker/utils/index.js'
import dayjs from 'dayjs'
import getDayProps from '@/components/ui/DatePicker/tables/components/props/getDayProps.js'
import classNames from 'classnames'
import Day from '@/components/ui/DatePicker/tables/components/Day.vue'

const { locale: themeLocale } = inject('config', DEFAULT_CONFIG)
defineOptions({
    inheritAttrs: false,
})

const props = defineProps({
    locale: String,
    month: Date,
    firstDayOfWeek: { type: String, default: 'monday' },
    weekdayLabelFormat: String,
    maxDate: Number,
    minDate: Number,
    modelValue: [Array, String, Number],
    disableDate: [Function, Boolean],
    disableOutOfMonth: Boolean,
    dayClassName: Function,
    dayStyle: Function,
    styles: {
        type: Object,
        default: () => {},
    },
    renderDay: Function,
    fullWidth: Boolean,
    hideWeekdays: Boolean,
    hideOutOfMonthDates: Boolean,
    isDateInRange: { type: Function, default: () => false },
    isDateFirstInRange: { type: Function, default: () => false },
    isDateLastInRange: { type: Function, default: () => false },
    focusable: { type: Boolean, default: true },
    preventFocus: { type: Boolean, default: true },
    size: {
        type: String,
        default: 'sm',
    },
    range: Array,
    weekendDays: { type: Array, default: () => [0, 6] },
})
const finalLocale = computed(() => props.locale || themeLocale)
const days = getMonthDays(props.month, props.firstDayOfWeek)
const weekdays = getWeekdaysNames(finalLocale, props.firstDayOfWeek, props.weekdayLabelFormat).map((weekday) =>
    h('th', { class: 'week-day-cell', key: weekday }, [h('span', { class: 'week-day-cell-content' }, weekday)])
)
const hasValue = computed(() =>
    Array.isArray(props.modelValue)
        ? props.modelValue.every((item) => item instanceof Date)
        : props.modelValue instanceof Date
)

const hasValueInMonthRange = computed(
    () =>
        props.modelValue instanceof Date &&
        dayjs(props.modelValue).isAfter(dayjs(props.month).startOf('month')) &&
        dayjs(props.modelValue).isBefore(dayjs(props.month).endOf('month'))
)

const firstIncludedDay = computed(
    () =>
        days
            .flatMap((_) => _)
            .find((date) => {
                const dayProps = getDayProps({
                    date,
                    month: props.month,
                    hasValue: hasValue.value,
                    minDate: props.minDate,
                    maxDate: props.maxDate,
                    value: props.modelValue,
                    disableDate: props.disableDate,
                    disableOutOfMonth: props.disableOutOfMonth,
                    range: props.range,
                    weekendDays: props.weekendDays,
                })

                return !dayProps.disabled && !dayProps.outOfMonth
            }) || dayjs(props.month).startOf('month').toDate()
)
const { class: className, ...rest } = useAttrs()
const dayRefs = ref([])
const dayProps = computed(() => {
    const propsData = {
        month: props.month,
        hasValue: Array.isArray(props.value)
            ? props.value.every((item) => item instanceof Date)
            : props.value instanceof Date,
        minDate: props.minDate,
        maxDate: props.maxDate,
        value: props.value,
        disableDate: props.disableDate,
        disableOutOfMonth: props.disableOutOfMonth,
        range: props.range,
        weekendDays: props.weekendDays,
    }

    return days.value.map((row) => row.map((date) => getDayProps({ date, ...propsData })))
})
const setDayRef = (rowIndex, cellIndex) => (button) => {
    if (dayRefs.value) {
        if (!Array.isArray(dayRefs.value[rowIndex])) {
            dayRefs.value[rowIndex] = []
        }
        dayRefs.value[rowIndex][cellIndex] = button
    }
}

defineExpose({ dayRefs })
const emit = defineEmits(['change', 'keydown', 'mouseenter'])
</script>

<template>
    <table :class="classNames('picker-table', className)" v-bind="rest" cellspacing="0">
        <thead v-if="!hideWeekdays">
            <tr>
                <component :is="weekdays" />
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rowIndex) in days" :key="rowIndex" class="date-picker-week-cell">
                <td v-for="(date, cellIndex) in row" :key="cellIndex">
                    <Day
                        :ref="setDayRef(rowIndex, cellIndex)"
                        :out-of-month="dayProps[rowIndex][cellIndex].outOfMonth"
                        :weekend="dayProps[rowIndex][cellIndex].weekend"
                        :in-range="
                            dayProps[rowIndex][cellIndex].inRange || isDateInRange(date, dayProps[rowIndex][cellIndex])
                        "
                        :first-in-range="
                            dayProps[rowIndex][cellIndex].firstInRange ||
                            isDateFirstInRange(date, dayProps[rowIndex][cellIndex])
                        "
                        :last-in-range="
                            dayProps[rowIndex][cellIndex].lastInRange ||
                            isDateLastInRange(date, dayProps[rowIndex][cellIndex])
                        "
                        :first-in-month="isSameDate(date, firstIncludedDay)"
                        :selected="
                            dayProps[rowIndex][cellIndex].selected || dayProps[rowIndex][cellIndex].selectedInRange
                        "
                        :has-value="hasValueInMonthRange"
                        :disabled="dayProps[rowIndex][cellIndex].disabled"
                        :class="
                            typeof dayClassName === 'function'
                                ? dayClassName(date, dayProps[rowIndex][cellIndex])
                                : null
                        "
                        :style="typeof dayStyle === 'function' ? dayStyle(date, dayProps[rowIndex][cellIndex]) : null"
                        :full-width="fullWidth"
                        :focusable="focusable"
                        :hide-out-of-month-dates="hideOutOfMonthDates"
                        :styles="styles"
                        :render-day="renderDay"
                        :is-today="isSameDate(date, new Date())"
                        :value="date"
                        @click="() => emit('change', date)"
                        @keydown="() => emit('keydown', { rowIndex, cellIndex, date, $event })"
                        @mousedown="(e) => preventFocus && e.preventFocus()"
                        @mouseenter="(e) => emit('mouseenter', e)"
                    ></Day>
                </td>
            </tr>
        </tbody>
    </table>
</template>
