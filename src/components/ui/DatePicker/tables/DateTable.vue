<script setup>
import capitalize from '@/components/ui/utils/capitalize.js'
import dayjs from 'dayjs'
import { computed, inject, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import { isMonthInRange } from '@/components/ui/DatePicker/utils/index.js'
import Header from '@/components/ui/DatePicker/tables/Header.vue'
import Month from '@/components/ui/DatePicker/tables/components/Month.vue'

const formatMonthLabel = ({ month, locale, format }) => {
    return capitalize(dayjs(month).locale(locale).format(format))
}

const props = defineProps({
    month: Date,
    locale: String,
    dateViewCount: Number,
    paginateBy: Number,
    renderDay: Function,
    daysRefs: Object,
    minDate: Date,
    maxDate: Date,
    enableHeaderLabel: Boolean,
    labelFormat: Object,
    weekdayLabelFormat: String,
    preventFocus: Boolean,
})

const emit = defineEmits(['monthChange', 'nextLevel', 'dayKeyDown'])

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const pickerHeaderLabelClass = computed(() => `picker-header-label hover:text-${themeColor}-${primaryColorLevel}`)

const nextMonth = computed(() => dayjs(props.month).add(props.dateViewCount, 'months').toDate())
const previousMonth = computed(() => dayjs(props.month).subtract(1, 'months').toDate())

const months = computed(() => {
    return Array(props.dateViewCount)
        .fill(0)
        .map((_, index) => {
            const monthDate = dayjs(props.month).add(index, 'months').toDate()
            return {
                monthDate,
                hasNext:
                    index + 1 === props.dateViewCount &&
                    isMonthInRange({
                        date: nextMonth.value,
                        minDate: props.minDate,
                        maxDate: props.maxDate,
                    }),
                hasPrevious:
                    index === 0 &&
                    isMonthInRange({
                        date: previousMonth.value,
                        minDate: props.minDate,
                        maxDate: props.maxDate,
                    }),
            }
        })
})
defineOptions({
    inheritAttrs: false,
})
const { class: className, ...rest } = useAttrs()
</script>

<template>
    <div v-for="(monthDate, index) in months" :key="index" class="day-picker">
        <Header
            :has-next="index + 1 === dateViewCount && isMonthInRange({ date: nextMonth, minDate, maxDate })"
            :has-previous="index === 0 && isMonthInRange({ date: previousMonth, minDate, maxDate })"
            :class="className"
            :render-center="dateViewCount > 1"
            @next="() => emit('monthChange', month.add(paginateBy, 'months').toDate())"
            @previous="() => emit('monthChange', month.subtract(paginateBy, 'months').toDate())"
        >
            <div>
                <button
                    :class="pickerHeaderLabelClass"
                    :disabled="!enableHeaderLabel"
                    :tabindex="index > 0 ? -1 : 0"
                    @click="() => emit('nextLevel', 'month')"
                    @mousedown="(event) => preventFocus && event.preventDefault()"
                >
                    {{ formatMonthLabel({ month: monthDate, locale, format: labelFormat?.month || 'MMM' }) }}
                </button>
                <button
                    :class="pickerHeaderLabelClass"
                    :disabled="!enableHeaderLabel"
                    :tabindex="index > 0 ? -1 : 0"
                    @click="() => emit('nextLevel', 'year')"
                    @mousedown="(event) => preventFocus && event.preventDefault()"
                >
                    {{ formatMonthLabel({ month: monthDate, locale, format: labelFormat?.year || 'YYYY' }) }}
                </button>
            </div>
        </Header>
        <Month
            :month="monthDate"
            :days-refs="daysRefs[index]"
            :min-date="minDate"
            :max-date="maxDate"
            :class="className"
            :locale="locale"
            :focusable="index === 0"
            :prevent-focus="preventFocus"
            :render-day="renderDay"
            :weekday-label-format="weekdayLabelFormat"
            v-bind="rest"
            @keydown="(args) => emit('dayKeyDown', { index, ...args })"
        />
    </div>
</template>
