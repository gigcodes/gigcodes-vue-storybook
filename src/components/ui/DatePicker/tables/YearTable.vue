<template>
    <div :class="['year-picker', className]" v-bind="rest">
        <Header
            :label="`${formatYear(range[0], yearLabelFormat)} - ${formatYear(
                range[range.length - 1],
                yearLabelFormat
            )}`"
            :has-previous="typeof minYear === 'number' ? minYear < range[0] : true"
            :has-next="typeof maxYear === 'number' ? maxYear > range[range.length - 1] : true"
            next-level-disabled
            next-label="Next decade"
            previous-label="Previous decade"
            :prevent-focus="preventFocus"
            @next="() => (decade = decade + 10)"
            @previous="() => (decade = decade - 10)"
        />
        <div class="year-table">
            <button
                v-for="year in years"
                :key="year"
                :disabled="year < minYear || year > maxYear"
                :class="[
                    'year-picker-cell',
                    year === value &&
                        !disabled(year) &&
                        `bg-${themeColor}-${primaryColorLevel} text-white year-picker-cell-active`,
                    !year === value && !disabled(year) && 'hover:bg-gray-100',
                    disabled && 'year-picker-cell-disabled',
                ]"
                @click="() => emit('change', year)"
                @mousedown="(event) => preventFocus && event.preventDefault()"
            >
                {{ formatYear(year, yearLabelFormat) }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, inject, ref, useAttrs } from 'vue'
import Header from './Header'
import { formatYear, getDecadeRange } from '../utils'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'

const emit = defineEmits(['change'])
const props = defineProps({
    value: Number,
    onChange: Function,
    minYear: Number,
    maxYear: Number,
    preventFocus: Boolean,
    yearLabelFormat: {
        type: String,
        default: 'YYYY',
    },
})

const disabled = (year) => year < props.minYear || year > props.maxYear

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

defineOptions({
    inheritAttrs: false,
})
const { class: className, ...rest } = useAttrs()
const decade = ref(props.value)
const range = computed(() => {
    return getDecadeRange(decade.value)
})

const years = computed(() => {
    return range.value.map((year) => year)
})
</script>
