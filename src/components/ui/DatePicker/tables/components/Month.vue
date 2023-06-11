<script setup>
import { computed, inject, ref, useAttrs } from 'vue'
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
    value: [Array, String, Number, Date],
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
    isDateInRange: [Function, Boolean],
    isDateFirstInRange: [Function, Boolean],
    isDateLastInRange: [Function, Boolean],
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
const days = computed(() => getMonthDays(props.month, props.firstDayOfWeek))
const weekdays = computed(() => getWeekdaysNames(finalLocale, props.firstDayOfWeek, props.weekdayLabelFormat))

const hasValue = computed(() =>
    Array.isArray(props.value) ? props.value.every((item) => item instanceof Date) : props.value instanceof Date
)

const hasValueInMonthRange = computed(
    () =>
        props.value instanceof Date &&
        dayjs(props.value).isAfter(dayjs(props.month).startOf('month')) &&
        dayjs(props.value).isBefore(dayjs(props.month).endOf('month'))
)

const firstIncludedDay = computed(
    () =>
        days.value
            .flatMap((_) => _)
            .find((date) => {
                const dayProps = getDayProps({
                    date,
                    month: props.month,
                    hasValue: hasValue.value,
                    minDate: props.minDate,
                    maxDate: props.maxDate,
                    value: props.value,
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
                <th v-for="(weekday, i) in weekdays" :key="i" class="week-day-cell">
                    <span class="week-day-cell-content">{{ weekday }}</span>
                </th>
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
                            dayProps[rowIndex][cellIndex].inRange || typeof isDateInRange === 'function'
                                ? isDateInRange(date, dayProps[rowIndex][cellIndex])
                                : isDateInRange
                        "
                        :first-in-range="
                            dayProps[rowIndex][cellIndex].firstInRange || typeof isDateFirstInRange === 'function'
                                ? isDateFirstInRange(date, dayProps[rowIndex][cellIndex])
                                : isDateFirstInRange
                        "
                        :last-in-range="
                            dayProps[rowIndex][cellIndex].lastInRange || typeof isDateLastInRange === 'function'
                                ? isDateLastInRange(date, dayProps[rowIndex][cellIndex])
                                : isDateLastInRange
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
