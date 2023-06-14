<script setup>
import { computed, inject, ref, useSlots, watch } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import capitalize from '@/components/ui/utils/capitalize.js'
import dayjs from 'dayjs'
import BasePicker from '@/components/ui/DatePicker/BasePicker.vue'
import Calendar from '@/components/ui/DatePicker/Calendar.vue'
import useControllableState from '../utils/useControllableState'

const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD'

const props = defineProps({
    locale: String,
    type: String,
    size: String,
    dayClassName: Function,
    inputFormat: String,
    closePickerOnChange: {
        type: Boolean,
        default: true,
    },
    clearable: {
        type: Boolean,
        default: true,
    },
    dateFormat: String,
    defaultView: String,
    labelFormat: {
        type: Object,
        default: () => ({
            month: 'MMM',
            year: 'YYYY',
        }),
    },
    yearLabelFormat: String,
    defaultOpen: Boolean,
    disabled: Boolean,
    inputtable: Boolean,
    openPickerOnClear: Boolean,
    disableOutOfMonth: Boolean,
    enableHeaderLabel: Boolean,
    hideOutOfMonthDates: Boolean,
    hideWeekdays: Boolean,
    disableDate: Function,
    defaultMonth: Date,
    weekendDays: [Date, Array, String],
    renderDay: Function,
    maxDate: Date,
    minDate: Date,
    firstDayOfWeek: {
        type: String,
        default: 'monday',
    },
    name: {
        type: String,
        default: 'monday',
    },
    dayStyle: Function,
    modelValue: [Date, String, Array],
    defaultValue: [Date, String, Array],
    dateViewCount: Number,
})
const emit = defineEmits(['update:modelValue', 'dropdownClose', 'dropdownOpen', 'blur', 'focus'])
const { locale: themeLocale } = inject('config', DEFAULT_CONFIG)
const finalLocale = computed(() => props.locale || themeLocale)
const dateFormat = computed(() =>
    props.type === 'date' ? DEFAULT_INPUT_FORMAT : props.inputFormat || DEFAULT_INPUT_FORMAT
)

const dropdownOpened = ref(props.defaultOpen)
const inputRef = ref(null)
const lastValidValue = ref(props.modelValue ?? null)

const [_value, setValue] = useControllableState({
    prop: props.modelValue,
    defaultProp: props.defaultValue,
    onChange: (value) => emit('update:modelValue', value),
})

const calendarMonth = ref(_value.value || props.defaultMonth || new Date())
const focused = ref(false)
const inputState = ref(
    _value.value instanceof Date
        ? capitalize(dayjs(_value.value).locale(finalLocale.value).format(dateFormat.value))
        : ''
)

watch(
    () => [props.modelValue, focused.value, themeLocale],
    () => {
        if (props.modelValue === null && !focused.value) {
            inputState.value = ''
        }
        if (props.modelValue instanceof Date && !focused.value) {
            inputState.value = capitalize(dayjs(props.modelValue).locale(finalLocale.value).format(dateFormat.value))
        }
    }
)

watch(
    () => [themeLocale],
    () => {
        if (props.modelValue instanceof Date && inputState.value && !focused.value) {
            inputState.value = capitalize(dayjs(_value.value).locale(finalLocale.value).format(dateFormat.value))
        }
    }
)

const handleValueChange = (date) => {
    setValue(date)
    inputState.value = capitalize(dayjs(date).locale(finalLocale.value).format(dateFormat.value))
    props.closePickerOnChange && (dropdownOpened.value = false)
    window.setTimeout(() => inputRef.value?.focus(), 0)
}

const handleClear = () => {
    setValue(null)
    lastValidValue.value = null
    inputState.value = ''
    props.openPickerOnClear && (dropdownOpened.value = true)
    inputRef.value?.focus()
}

const parseDate = (date) => dayjs(date, dateFormat.value, finalLocale.value).toDate()

const setDateFromInput = () => {
    let date = typeof _value.value === 'string' ? parseDate(_value.value) : _value.value

    if (props.maxDate && dayjs(date).isAfter(props.maxDate)) {
        date = props.maxDate
    }

    if (props.minDate && dayjs(date).isBefore(props.minDate)) {
        date = props.minDate
    }

    if (dayjs(date).isValid()) {
        setValue(date)
        lastValidValue.value = date
        inputState.value = capitalize(dayjs(date).locale(finalLocale.value).format(dateFormat.value))
        calendarMonth.value = date
    } else {
        setValue(lastValidValue)
    }
}

const handleInputBlur = (event) => {
    emit('blur', event)
    focused.value = false
    if (props.inputtable) {
        setDateFromInput()
    }
}

const handleKeyDown = (event) => {
    if (event.key === 'Enter' && props.inputtable) {
        dropdownOpened.value = false
        setDateFromInput()
    }
}

const handleInputFocus = (event) => {
    emit('focus', event)
    focused.value = true
}

const handleChange = (event) => {
    dropdownOpened.value = true
    const date = parseDate(event.target.value)
    if (dayjs(date).isValid()) {
        setValue(date)
        lastValidValue.value = date
        inputState.value = event.target.value
        calendarMonth.value = date
    } else {
        inputState.value = event.target.value
    }
}

const slots = useSlots()
</script>
<template>
    <BasePicker
        ref="inputRef"
        v-model:dropdown="dropdownOpened"
        :inputtable="inputtable"
        :size="size"
        :name="name"
        :input-label="inputState"
        :clearable="type === 'date' ? false : clearable && !!_value && !disabled"
        :disabled="disabled"
        :type="type"
        @change="handleChange"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
        @key-down="handleKeyDown"
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
        <Calendar
            :locale="finalLocale"
            :month="inputtable ? calendarMonth : undefined"
            :default-month="defaultMonth || (_value instanceof Date ? _value : new Date())"
            :value="_value instanceof Date ? _value : _value && dayjs(_value).toDate()"
            :label-format="labelFormat"
            :day-class-name="dayClassName"
            :day-style="dayStyle"
            :disable-out-of-month="disableOutOfMonth"
            :min-date="minDate"
            :max-date="maxDate"
            :disable-date="disableDate"
            :first-day-of-week="firstDayOfWeek"
            :prevent-focus="inputtable"
            :date-view-count="dateViewCount"
            :enable-header-label="enableHeaderLabel"
            :default-view="defaultView"
            :hide-out-of-month-dates="hideOutOfMonthDates"
            :hide-weekdays="hideWeekdays"
            :render-day="renderDay"
            :weekend-days="weekendDays"
            :year-label-format="yearLabelFormat"
            @month-change="(v) => (calendarMonth = v)"
            @change="handleValueChange"
        />
    </BasePicker>
</template>
