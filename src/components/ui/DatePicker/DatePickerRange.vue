<script setup>
import dayjs from 'dayjs'
import { capitalize, computed, inject, ref, watch, useSlots } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import RangeCalendar from '@/components/ui/DatePicker/RangeCalendar.vue'
import BasePicker from '@/components/ui/DatePicker/BasePicker.vue'
import useControllableState from '@/components/ui/utils/useControllableState.js'

const validationRule = (val) =>
    Array.isArray(val.value) && val.value.length === 2 && val.value.every((v) => v instanceof Date)

const isFirstDateSet = (val) => Array.isArray(val.value) && val.value.length === 2 && val.value[0] instanceof Date

const props = defineProps({
    clearable: { type: Boolean, default: true },
    closePickerOnChange: { type: Boolean, default: true },
    dateViewCount: { type: Number, default: 1 },
    dayClassName: Function,
    dayStyle: String,
    defaultMonth: Date,
    defaultOpen: Boolean,
    defaultValue: Array,
    defaultView: String,
    disabled: Boolean,
    disableDate: Function,
    enableHeaderLabel: { type: Boolean, default: true },
    disableOutOfMonth: Boolean,
    firstDayOfWeek: { type: String, default: 'monday' },
    hideOutOfMonthDates: Boolean,
    hideWeekdays: Boolean,
    inputFormat: String,
    labelFormat: { type: Object, default: () => ({ month: 'MMM', year: 'YYYY' }) },
    seperator: { type: String, default: '~' },
    locale: String,
    maxDate: Date,
    minDate: Date,
    openPickerOnClear: Boolean,
    renderDay: Function,
    singleDate: Boolean,
    size: String,
    weekendDays: Array,
    yearLabelFormat: Object,
    modelValue: [Date, String, Array],
})

const emit = defineEmits(['change', 'update:modelValue'])
const dropdownOpened = ref(props.defaultOpen)
const inputRef = ref(null)

const [_value, setValue] = useControllableState({
    prop: props.modelValue,
    defaultProp: props.defaultValue !== undefined ? props.defaultValue : [null, null],
    onChange: (e) => {
        emit('update:modelValue', e)
    },
})

const { locale: themeLocale } = inject('config', DEFAULT_CONFIG)
const finalLocale = computed(() => props.locale || themeLocale)

const dateFormat = computed(() => props.inputFormat || 'YYYY-MM-DD')

const handleValueChange = (range) => {
    setValue(range)
    if (props.closePickerOnChange && validationRule(range)) {
        // dropdownOpened.value = false
        window.setTimeout(() => inputRef.value?.focus(), 0)
    }
}

const valueValid = computed(() => validationRule(_value))
const firstValueValid = computed(() => isFirstDateSet(_value))

const firstDateLabel = computed(() =>
    _value.value[0] ? capitalize(dayjs(_value.value[0]).locale(finalLocale.value).format(dateFormat.value)) : ''
)

const secondDateLabel = computed(() =>
    _value.value[1] ? capitalize(dayjs(_value.value[1]).locale(finalLocale.value).format(dateFormat.value)) : ''
)

const handleClear = () => {
    setValue([null, null])
    dropdownOpened.value = false
    props.openPickerOnClear && (dropdownOpened.value = true)
    inputRef.value?.focus()
}

watch(dropdownOpened, (val) => {
    if (!val && firstValueValid.value && _value.value[1] === null) {
        handleClear()
    }
})
const slots = useSlots()
</script>
<template>
    <BasePicker
        :ref="inputRef"
        v-model:dropdown="dropdownOpened"
        :size="size"
        :input-label="firstValueValid ? `${firstDateLabel} ${seperator} ${secondDateLabel}` : ''"
        :clearable="clearable && firstValueValid"
        :date-view-count="dateViewCount"
        :disabled="disabled"
        @clear="handleClear"
    >
        <template v-if="slots.inputPrefix" #prefix>
            <slot name="inputPrefix" />
        </template>
        <template v-if="slots.inputSuffix" #suffix>
            <slot name="inputSuffix" />
        </template>
        <template v-if="slots.clearButton" #clearButton>
            <slot name="clearButton" />
        </template>
        <RangeCalendar
            :locale="finalLocale"
            :default-month="valueValid ? _value[0] : defaultMonth"
            :value="_value"
            :label-format="labelFormat"
            :day-class-name="dayClassName"
            :day-style="dayStyle"
            :disable-out-of-month="disableOutOfMonth"
            :min-date="minDate"
            :max-date="maxDate"
            :disable-date="disableDate"
            :first-day-of-week="firstDayOfWeek"
            :enable-header-label="enableHeaderLabel"
            :single-date="singleDate"
            :date-view-count="dateViewCount"
            :default-view="defaultView"
            :hide-out-of-month-dates="hideOutOfMonthDates"
            :hide-weekdays="hideWeekdays"
            :render-day="renderDay"
            :weekend-days="weekendDays"
            :year-label-format="yearLabelFormat"
            @change="handleValueChange"
        />
    </BasePicker>
</template>
