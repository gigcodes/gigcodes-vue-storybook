<script setup>
import { computed, inject, ref, useSlots, watch } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import useControllableState from '@/components/ui/utils/useControllableState.js'
import capitalize from '@/components/ui/utils/capitalize.js'
import dayjs from 'dayjs'
import BasePicker from '@/components/ui/DatePicker/BasePicker.vue'
import Calendar from '@/components/ui/DatePicker/Calendar.vue'

const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD'

const props = defineProps({
    locale: String,
    type: String,
    size: String,
    dayClassName: String,
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
    disableDate: Boolean,
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
    dayStyle: {
        type: Object,
        default: () => {},
    },
    defaultValue: [Date, String, Array],
    dateViewCount: Number,
})
const emit = defineEmits(['change', 'dropdownClose', 'dropdownOpen', 'blur', 'focus'])
const { locale: themeLocale } = inject('config', DEFAULT_CONFIG)
const finalLocale = computed(() => props.locale || themeLocale)
const dateFormat = computed(() =>
    props.type === 'date' ? DEFAULT_INPUT_FORMAT : props.inputFormat || DEFAULT_INPUT_FORMAT
)

const dropdownOpened = ref(props.defaultOpen)
const inputRef = ref(null)
const lastValidValue = ref(props.defaultValue ?? null)

const [_value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue,
    onChange: (e) => emit('change', e),
})

const calendarMonth = ref(_value.value || props.defaultMonth || new Date())
const focused = ref(false)
const inputState = ref(
    _value instanceof Date ? capitalize(dayjs(_value).locale(finalLocale.value).format(dateFormat.value)) : ''
)

const closeDropdown = () => {
    dropdownOpened.value = false
    emit('dropdownClose')
}

const openDropdown = () => {
    openDropdown.value = true
    emit('dropdownOpen')
}

watch(
    () => [props.value, focused.value, themeLocale],
    () => {
        if (props.value === null && !focused.value) {
            inputState.value = ''
        }
        if (props.value instanceof Date && !focused.value) {
            inputState.value = capitalize(dayjs(props.value).locale(finalLocale.value).format(dateFormat.value))
        }
    }
)

watch(
    () => [themeLocale],
    () => {
        if (props.defaultValue instanceof Date && inputState && !focused.value) {
            inputState.value = capitalize(dayjs(_value).locale(finalLocale.value).format(dateFormat.value))
        }
    }
)

const handleValueChange = (date) => {
    setValue(date)
    inputState.value = capitalize(dayjs(date).locale(finalLocale.value).format(dateFormat.value))
    dropdownOpened.value = false
    emit('dropdownClose')
    window.setTimeout(() => inputRef.value?.focus(), 0)
}

const handleClear = () => {
    setValue(null)
    lastValidValue.value = null
    inputState.value = ''
    dropdownOpened.value = false
    emit('dropdownClose')
    props.openPickerOnClear && openDropdown()
    inputRef.value?.focus()
}

const parseDate = (date) => dayjs(date, dateFormat.value, props.finalLocale).toDate()

const setDateFromInput = () => {
    let date = typeof _value === 'string' ? parseDate(_value) : _value

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
        closeDropdown()
        setDateFromInput()
    }
}

const handleInputFocus = (event) => {
    emit('focus', event)
    focused.value = true
}

const handleChange = (event) => {
    openDropdown()

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
        v-model:drop-down-opened="dropdownOpened"
        :inputtable="inputtable"
        :size="size"
        :name="name"
        :input-label="inputState"
        :clearable="type === 'date' ? false : clearable && !!_value && !disabled"
        :disabled="disabled"
        :type="type"
        @open-dropdown="openDropdown"
        @change="handleChange"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
        @key-down="handleKeyDown"
        @close-dropdown="closeDropdown"
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
