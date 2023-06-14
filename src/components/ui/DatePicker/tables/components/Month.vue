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
    maxDate: [Date],
    minDate: [Date],
    value: [Array, String, Number, Date],
    disableDate: Function,
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

const hoveredDay = inject('hoveredDay', null)
const pickedDate = inject('pickedDate', null)

const shouldHighlightDate = (date, modifiers) => {
    if (pickedDate?.value instanceof Date && hoveredDay?.value instanceof Date) {
        const result = [hoveredDay.value, pickedDate.value]
        result.sort((a, b) => a.getTime() - b.getTime())
        return (
            !modifiers.selected &&
            dayjs(date).subtract(1, 'day').isBefore(result[1]) &&
            dayjs(date).add(1, 'day').isAfter(result[0])
        )
    }

    return false
}

const isPickedDateFirstInRange = (date, modifiers) => {
    if (pickedDate?.value instanceof Date && hoveredDay?.value instanceof Date) {
        const result = [hoveredDay.value, pickedDate.value]
        result.sort((a, b) => a.getTime() - b.getTime())
        return modifiers.selected && dayjs(date).isBefore(result[1])
    }

    return false
}

const isPickedDateLastInRange = (date, modifiers) => {
    if (pickedDate?.value instanceof Date && hoveredDay?.value instanceof Date) {
        const result = [hoveredDay.value, pickedDate.value]
        result.sort((a, b) => a.getTime() - b.getTime())
        return modifiers.selected && dayjs(date).isAfter(result[0])
    }

    return false
}

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

const setDayRef = (rI, cI) => (button) => {
    if (dayRefs.value) {
        if (!Array.isArray(dayRefs.value[rI])) {
            dayRefs.value[rI] = []
        }
        dayRefs.value[rI][cI] = button
    }
}

defineExpose({ dayRefs })
const emit = defineEmits(['change', 'keydown', 'dayMouseEnter'])
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
            <tr v-for="(row, rI) in days" :key="rI" class="date-picker-week-cell">
                <td v-for="(date, cI) in row" :key="cI" class="date-picker-cell">
                    <Day
                        :ref="setDayRef(rI, cI)"
                        :out-of-month="dayProps[rI][cI].outOfMonth"
                        :weekend="dayProps[rI][cI].weekend"
                        :in-range="dayProps[rI][cI].inRange || shouldHighlightDate(date, dayProps[rI][cI])"
                        :first-in-range="
                            dayProps[rI][cI].firstInRange || isPickedDateFirstInRange(date, dayProps[rI][cI])
                        "
                        :last-in-range="dayProps[rI][cI].lastInRange || isPickedDateLastInRange(date, dayProps[rI][cI])"
                        :first-in-month="isSameDate(date, firstIncludedDay)"
                        :selected="dayProps[rI][cI].selected || dayProps[rI][cI].selectedInRange"
                        :has-value="hasValueInMonthRange"
                        :disabled="dayProps[rI][cI].disabled"
                        :class="typeof dayClassName === 'function' ? dayClassName(date, dayProps[rI][cI]) : null"
                        :style="typeof dayStyle === 'function' ? dayStyle(date, dayProps[rI][cI]) : null"
                        :full-width="fullWidth"
                        :focusable="focusable"
                        :hide-out-of-month-dates="hideOutOfMonthDates"
                        :styles="styles"
                        :render-day="renderDay"
                        :is-today="isSameDate(date, new Date())"
                        :value="date"
                        @click="() => emit('change', date)"
                        @keydown="(event) => emit('keydown', { rI, cI, date, event })"
                        @mousedown="(e) => preventFocus && e.preventFocus()"
                        @mouseenter="(e) => emit('dayMouseEnter', e)"
                    ></Day>
                </td>
            </tr>
        </tbody>
    </table>
</template>
