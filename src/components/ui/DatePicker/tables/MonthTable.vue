<template>
    <div :class="['month-picker', className]" v-bind="rest">
        <Header
            :label="formatYear(year, yearLabelFormat)"
            :has-next="typeof maxYear === 'number' ? year < maxYear : true"
            :has-previous="typeof minYear === 'number' ? year > minYear : true"
            :class-name="className"
            next-label="Next year"
            previous-label="Previous year"
            :prevent-focus="preventFocus"
            @next="() => emits('yearChange', year + 1)"
            @previous="() => emits('yearChange', year - 1)"
            @next-level="(e) => emits('nextLevel', e)"
        />
        <div class="month-table">
            <button
                v-for="(month, index) in range"
                :key="index"
                :class="[
                    'year-picker-cell',
                    index === value.month &&
                        year === value.year &&
                        !disabled &&
                        `bg-${themeColor}-${primaryColorLevel} text-white month-picker-cell-active`,
                    !active(index) && !disabled && 'hover:bg-gray-100',
                    disabled && 'month-picker-cell-disabled',
                ]"
                :disabled="disabled"
                @click="() => emits('change', index)"
                @mousedown="(event) => preventFocus && event.preventDefault()"
            >
                {{ month }}
            </button>
        </div>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import { formatYear, getMonthsNames, isMonthInRange } from '../utils'
import { computed, inject, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const props = defineProps({
    value: Object,
    onChange: Function,
    locale: String,
    year: Number,
    onYearChange: Function,
    onNextLevel: Function,
    minDate: Date,
    maxDate: Date,
    preventFocus: Boolean,
    monthLabelFormat: {
        type: String,
        default: 'MMM',
    },
    yearLabelFormat: {
        type: String,
        default: 'YYYY',
    },
})
defineOptions({
    inheritAttrs: false,
})
const { class: className, ...rest } = useAttrs()
const emits = defineEmits(['change', 'yearChange', 'nextLevel'])
const disabled = computed(
    () =>
        !isMonthInRange({
            date: new Date(props.year, props.index),
            minDate: props.minDate,
            maxDate: props.maxDate,
        })
)
const active = (index) => index === props.value.month && props.year === props.value.year

const range = getMonthsNames(props.locale, props.monthLabelFormat)
const minYear = computed(() => (props.minDate instanceof Date ? props.minDate.getFullYear() : undefined))
const maxYear = computed(() => (props.maxDate instanceof Date ? props.maxDate.getFullYear() : undefined))
</script>
