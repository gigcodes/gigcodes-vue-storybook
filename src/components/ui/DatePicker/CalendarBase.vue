<script setup>
import { computed, inject, ref, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant.js'
import useControllableState from '../utils/useControllableState.js'
import classNames from 'classnames'
import YearTable from './tables/YearTable.vue'
import MonthTable from './tables/MonthTable.vue'
import DateTable from './tables/DateTable.vue'

const { locale: themeLocale } = inject('config', DEFAULT_CONFIG)

const props = defineProps({
    defaultView: {
        type: String,
        default: 'date',
    },
    locale: String,
    dayClassName: Function,
    defaultMonth: Date,
    month: Date,
    labelFormat: Object,
    monthLabelFormat: {
        type: String,
        default: 'MMM',
    },
    weekdayLabelFormat: {
        type: String,
        default: 'dd',
    },
    yearLabelFormat: {
        type: String,
        default: 'YYYY',
    },
    firstDayOfWeek: {
        type: String,
        default: 'monday',
    },
    dateViewCount: {
        type: Number,
        default: 1,
    },
    enableHeaderLabel: {
        type: Boolean,
        default: true,
    },
    disableDate: Boolean,
    disableOutOfMonth: Boolean,
    preventFocus: Boolean,
    hideWeekdays: Boolean,
    hideOutOfMonthDates: Boolean,
    isDateInRange: Boolean,
    isDateFirstInRange: Boolean,
    isDateLastInRange: Boolean,
    renderDay: Function,
    minDate: Date,
    maxDate: Date,
    value: Date,
    daysRefs: Object,
    dayStyle: Object,
    paginateBy: {
        type: Number,
        default: 1,
    },
    range: [Array, String, Date],
    weekendDays: [Array, String, Date],
})
const selectionState = ref(props.defaultView)

const finalLocale = computed(() => props.locale || themeLocale)

const paginate = computed(() => props.paginateBy ?? props.dateViewCount)

const emit = defineEmits(['monthChange', 'change', 'dayMouseEnter'])

const emitMonthChange = (month) => emit('monthChange', month)
const [_month, setMonth] = useControllableState({
    prop: props.month,
    defaultProp: props.defaultMonth !== undefined ? props.defaultMonth : new Date(),
    onChange: emitMonthChange,
})

const yearSelection = ref(_month.value.getFullYear())
const monthSelection = ref(_month.value.getMonth())

const minYear = props.minDate instanceof Date ? props.minDate.getFullYear() : 100
const maxYear = props.maxDate instanceof Date ? props.maxDate.getFullYear() : 10000

const daysPerRow = 6

const focusOnNextFocusableDay = (direction, monthIndex, payload, n = 1) => {
    const changeRow = ['down', 'up'].includes(direction)

    const rowIndex = changeRow ? payload.rowIndex + (direction === 'down' ? n : -n) : payload.rowIndex

    const cellIndex = changeRow ? payload.cellIndex : payload.cellIndex + (direction === 'right' ? n : -n)

    const dayToFocus = props.daysRefs.value[monthIndex][rowIndex][cellIndex]

    if (!dayToFocus) {
        return
    }

    if (dayToFocus.disabled) {
        focusOnNextFocusableDay(direction, monthIndex, payload, n + 1)
    } else {
        dayToFocus.focus()
    }
}

const handleDayKeyDown = (monthIndex, payload, event) => {
    switch (event.key) {
        case 'ArrowDown': {
            event.preventDefault()

            const hasRowBelow = payload.rowIndex + 1 < props.daysRefs.value[monthIndex].length
            if (hasRowBelow) {
                focusOnNextFocusableDay('down', monthIndex, payload)
            }
            break
        }
        case 'ArrowUp': {
            event.preventDefault()

            const hasRowAbove = payload.rowIndex > 0
            if (hasRowAbove) {
                focusOnNextFocusableDay('up', monthIndex, payload)
            }
            break
        }
        case 'ArrowRight': {
            event.preventDefault()

            const isNotLastCell = payload.cellIndex !== daysPerRow
            if (isNotLastCell) {
                focusOnNextFocusableDay('right', monthIndex, payload)
            } else if (monthIndex + 1 < props.dateViewCount) {
                if (props.daysRefs.value[monthIndex + 1][payload.rowIndex]) {
                    props.daysRefs.value[monthIndex + 1][payload.rowIndex][0]?.focus()
                }
            }
            break
        }
        case 'ArrowLeft': {
            event.preventDefault()

            if (payload.cellIndex !== 0) {
                focusOnNextFocusableDay('left', monthIndex, payload)
            } else if (monthIndex > 0) {
                if (props.daysRefs.value[monthIndex - 1][payload.rowIndex]) {
                    props.daysRefs.value[monthIndex - 1][payload.rowIndex][daysPerRow].focus()
                }
            }
            break
        }
        default:
            break
    }
}

defineOptions({
    inheritAttrs: false,
})
const { class: className, style, ...rest } = useAttrs()
</script>
<template>
    <div :class="classNames('picker-view', className)" v-bind="rest">
        <YearTable
            v-if="selectionState === 'year'"
            :value="yearSelection"
            :min-year="minYear"
            :max-year="maxYear"
            :class="className"
            :prevent-focus="preventFocus"
            :year-label-format="yearLabelFormat"
            @change="
                (year) => {
                    setMonth(new Date(year, monthSelection, 1))
                    yearSelection = year
                    selectionState = 'date'
                }
            "
        />
        <MonthTable
            v-if="selectionState === 'month'"
            :value="{ month: _month.getMonth(), year: _month.getFullYear() }"
            :year="yearSelection"
            :locale="finalLocale"
            :min-date="minDate"
            :max-date="maxDate"
            :class="className"
            :style="style"
            :prevent-focus="preventFocus"
            :year-label-format="yearLabelFormat"
            :month-label-format="monthLabelFormat"
            @year-change="(year) => (yearSelection = year)"
            @next-level="() => (selectionState = 'year')"
            @change="
                (monthValue) => {
                    setMonth(new Date(yearSelection, monthValue, 1))
                    monthSelection = monthValue
                    selectionState = 'date'
                }
            "
        />
        <DateTable
            v-if="selectionState === 'date'"
            :date-view-count="dateViewCount"
            :paginate-by="paginate"
            :month="_month"
            :locale="finalLocale"
            :min-date="minDate"
            :max-date="maxDate"
            :enable-header-label="enableHeaderLabel"
            :days-refs="daysRefs"
            :style="style"
            :day-class-name="dayClassName"
            :day-style="dayStyle"
            :disable-out-of-month="disableOutOfMonth"
            :disable-date="disableDate"
            :hide-weekdays="hideWeekdays"
            :prevent-focus="preventFocus"
            :first-day-of-week="firstDayOfWeek"
            :value="value"
            :range="range"
            :label-format="labelFormat"
            :weekday-label-format="weekdayLabelFormat"
            :render-day="renderDay"
            :hide-out-of-month-dates="hideOutOfMonthDates"
            :is-date-in-range="isDateInRange"
            :is-date-last-in-range="isDateLastInRange"
            :is-date-first-in-range="isDateFirstInRange"
            :weekend-days="weekendDays"
            @month-change="setMonth"
            @next-level="(v) => (selectionState = v)"
            @day-key-down="handleDayKeyDown"
            @change="(e) => emit('change', e)"
            @day-mouse-enter="(e) => emit('dayMouseEnter', e)"
        />
    </div>
</template>
