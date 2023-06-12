<script setup>
import dayjs from 'dayjs'
import { capitalize, computed, inject, ref, watch } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import RangeCalendar from '@/components/ui/DatePicker/RangeCalendar.vue'
import BasePicker from '@/components/ui/DatePicker/BasePicker.vue'
import useControllableState from '@/components/ui/utils/useControllableState.js'

const validationRule = (val) => Array.isArray(val) && val.length === 2 && val.every((v) => v instanceof Date)

const isFirstDateSet = (val) => Array.isArray(val) && val.length === 2 && val[0] instanceof Date

const props = defineProps({
    className: String,
    clearable: Boolean,
    clearButton: Boolean,
    closePickerOnChange: Boolean,
    dateViewCount: Number,
    dayClassName: Function,
    dayStyle: String,
    defaultMonth: Date,
    defaultOpen: Boolean,
    defaultValue: Array,
    defaultView: String,
    disabled: Boolean,
    disableDate: Function,
    enableHeaderLabel: Boolean,
    disableOutOfMonth: Boolean,
    firstDayOfWeek: String,
    hideOutOfMonthDates: Boolean,
    hideWeekdays: Boolean,
    inputFormat: String,
    inputPrefix: String,
    inputSuffix: String,
    labelFormat: Object,
    seperator: String,
    locale: String,
    maxDate: Date,
    minDate: Date,
    onChange: Function,
    onDropdownClose: Function,
    onDropdownOpen: Function,
    openPickerOnClear: Boolean,
    renderDay: Function,
    singleDate: Boolean,
    size: String,
    style: String,
    value: Array,
    weekendDays: Array,
    yearLabelFormat: Object,
})

const emit = defineEmits(['change'])

const dropdownOpened = ref(props.defaultOpen || false)
const inputRef = ref(null)
const [_value, setValue] = useControllableState({
    prop: props.month,
    defaultProp: props.defaultMonth !== undefined ? props.defaultMonth : new Date(),
    onChange: (e) => emit('change', e),
})

const { locale: themeLocale } = inject('config', DEFAULT_CONFIG)
const finalLocale = computed(() => props.locale || themeLocale)

const dateFormat = computed(() => props.inputFormat || 'YYYY-MM-DD')

const handleValueChange = (range) => {
    setValue(range)
    if (props.closePickerOnChange && validationRule(range)) {
        dropdownOpened.value = false
        props.onDropdownClose?.()
        window.setTimeout(() => inputRef.value?.focus(), 0)
    }
}

const valueValid = computed(() => validationRule(_value))
const firstValueValid = computed(() => isFirstDateSet(_value))

const firstDateLabel = computed(() =>
    _value[0] ? capitalize(dayjs(_value[0]).locale(finalLocale.value).format(dateFormat.value)) : ''
)

const secondDateLabel = computed(() =>
    _value[1] ? capitalize(dayjs(_value[1]).locale(finalLocale.value).format(dateFormat.value)) : ''
)

const handleClear = () => {
    setValue([null, null])

    dropdownOpened.value = true
    props.openPickerOnClear && props.onDropdownOpen?.()
    inputRef.value?.focus()
}

watch(dropdownOpened, (val) => {
    if (!val && firstValueValid.value && _value[1] === null) {
        handleClear()
    }
})
</script>
<template>
    <BasePicker
        :ref="inputRef"
        v-model:dropDownOpened="dropdownOpened"
        :dropdown-opened="dropdownOpened"
        :size="size"
        :class="className"
        :input-label="firstValueValid ? `${firstDateLabel} ${seperator} ${secondDateLabel}` : ''"
        :clearable="clearable && firstValueValid"
        :clear-button="clearButton"
        :date-view-count="dateViewCount"
        :disabled="disabled"
        :input-prefix="inputPrefix"
        :input-suffix="inputSuffix"
        @clear="handleClear"
        @close-dropdown="onDropdownClose"
        @open-dropdown="onDropdownOpen"
    >
        <RangeCalendar
            :locale="finalLocale"
            :default-month="valueValid ? value[0] : defaultMonth"
            :value="value"
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
