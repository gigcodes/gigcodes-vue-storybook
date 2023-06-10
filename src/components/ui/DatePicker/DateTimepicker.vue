<template>
    <BasePicker
        ref="inputRef"
        v-model="dropdownOpened"
        :class="className"
        :input-label="inputState"
        :clearable="clearable && !!_value && !disabled"
        :clear-button-label="clearButtonLabel"
        :disabled="disabled"
        :size="size"
        :input-prefix="inputPrefix"
        :input-suffix="inputSuffix"
        :name="name"
        :prevent-focus="false"
        @clear="handleClear"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
    >
        <Calendar
            v-if="inputtable"
            :locale="finalLocale"
            :month="calendarMonth"
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
            :date-view-count="dateViewCount"
            :enable-header-label="enableHeaderLabel"
            :default-view="defaultView"
            :hide-out-of-month-dates="hideOutOfMonthDates"
            :hide-weekdays="hideWeekdays"
            :render-day="renderDay"
            :weekend-days="weekendDays"
            :year-label-format="yearLabelFormat"
            @month-change="setCalendarMonth"
            @change="handleValueChange"
        />
        <div class="flex items-center gap-4 mt-4">
            <TimeInput
                :disabled="!_value"
                :value="_value"
                :format="amPm ? '12' : '24'"
                :clearable="false"
                :size="'sm'"
                @change="handleTimeChange"
            />
            <Button :size="'sm'" :disabled="!_value" @click="handleOk">
                {{ okButtonContent }}
            </Button>
        </div>
    </BasePicker>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import capitalize from '../utils/capitalize'
import TimeInput from '../TimeInput'
import Calendar from './Calendar'
import BasePicker from './BasePicker'
import Button from '../Buttons'
import useControllableState from '@/components/ui/utils/useControllableState.js'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'

const DEFAULT_INPUT_FORMAT = 'DD-MMM-YYYY hh:mm a'

const props = defineProps({
    amPm: {
        type: Boolean,
        default: true,
    },
    className: {
        type: String,
        default: '',
    },
    clearable: {
        type: Boolean,
        default: true,
    },
    clearButtonLabel: {
        type: String,
        default: '',
    },
    closePickerOnChange: {
        type: Boolean,
        default: false,
    },
    dateViewCount: {
        type: Number,
        default: undefined,
    },
    dayClassName: {
        type: String,
        default: '',
    },
    dayStyle: {
        type: String,
        default: '',
    },
    defaultMonth: {
        type: Date,
        default: undefined,
    },
    defaultOpen: {
        type: Boolean,
        default: false,
    },
    defaultValue: {
        type: [Date, null],
        default: null,
    },
    defaultView: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    disableDate: {
        type: Function,
        default: undefined,
    },
    enableHeaderLabel: {
        type: Boolean,
        default: undefined,
    },
    disableOutOfMonth: {
        type: Boolean,
        default: undefined,
    },
    firstDayOfWeek: {
        type: String,
        default: 'monday',
    },
    hideOutOfMonthDates: {
        type: Boolean,
        default: undefined,
    },
    hideWeekdays: {
        type: Boolean,
        default: undefined,
    },
    inputFormat: {
        type: String,
        default: '',
    },
    inputPrefix: {
        type: String,
        default: '',
    },
    inputSuffix: {
        type: String,
        default: '',
    },
    inputtable: {
        type: Boolean,
        default: undefined,
    },
    labelFormat: {
        type: Object,
        default: () => ({
            month: 'MMM',
            year: 'YYYY',
        }),
    },
    locale: {
        type: String,
        default: '',
    },
    maxDate: {
        type: Date,
        default: undefined,
    },
    minDate: {
        type: Date,
        default: undefined,
    },
    name: {
        type: String,
        default: 'dateTime',
    },
    okButtonContent: {
        type: String,
        default: 'OK',
    },
    onBlur: {
        type: Function,
        default: undefined,
    },
    onChange: {
        type: Function,
        default: undefined,
    },
    onFocus: {
        type: Function,
        default: undefined,
    },
    onDropdownClose: {
        type: Function,
        default: undefined,
    },
    onDropdownOpen: {
        type: Function,
        default: undefined,
    },
    openPickerOnClear: {
        type: Boolean,
        default: undefined,
    },
    renderDay: {
        type: Function,
        default: undefined,
    },
    size: {
        type: String,
        default: '',
    },
    style: {
        type: String,
        default: '',
    },
    value: {
        type: [Date, null],
        default: null,
    },
    weekendDays: {
        type: Array,
        default: () => [],
    },
    yearLabelFormat: {
        type: Object,
        default: () => ({}),
    },
})

const { locale: themeLocale } = inject('config', DEFAULT_CONFIG)

const finalLocale = ref(props.locale || themeLocale)
const dateFormat = ref(props.inputFormat || DEFAULT_INPUT_FORMAT)
const inputRef = ref(null)
const dropdownOpened = ref(props.defaultOpen || false)

// eslint-disable-next-line no-unused-vars
const [_, setLastValidValue] = useState(props.defaultValue ?? null)
const [_value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue,
    onChange: props.onChange,
})

const calendarMonth = ref(_value || props.defaultMonth || new Date())
const focused = ref(false)
const inputState = ref(
    _value instanceof Date ? capitalize(dayjs(_value).locale(finalLocale.value).format(dateFormat.value)) : ''
)

const closeDropdown = () => {
    dropdownOpened.value = false
    props.onDropdownClose?.()
}

const openDropdown = () => {
    dropdownOpened.value = true
    props.onDropdownOpen?.()
}

watch(
    () => props.value,
    (newValue) => {
        if (newValue === null && !focused.value) {
            inputState.value = ''
        }

        if (newValue instanceof Date && !focused.value) {
            inputState.value = dayjs(newValue).locale(finalLocale.value).format(dateFormat.value)
        }
    }
)

const handleValueChange = (date) => {
    if (_value) {
        date.setHours(_value.getHours())
        date.setMinutes(_value.getMinutes())
    } else {
        const now = new Date(Date.now())
        date.setHours(now.getHours())
        date.setMinutes(now.getMinutes())
    }
    setValue(date)
    if (!props.value && !props.closePickerOnChange) {
        inputState.value = dayjs(date).locale(finalLocale.value).format(dateFormat.value)
    }
    props.closePickerOnChange &&
        (inputState.value = capitalize(dayjs(date).locale(finalLocale.value).format(dateFormat.value)))
    props.closePickerOnChange && closeDropdown()
    window.setTimeout(() => inputRef.value?.focus(), 0)
}

const handleClear = () => {
    setValue(null)
    setLastValidValue(null)
    inputState.value = ''
    props.openPickerOnClear && openDropdown()
    inputRef.value?.focus()
    props.onChange?.(null)
}

const parseDate = (date) => dayjs(date, dateFormat.value, finalLocale.value).toDate()

const handleInputBlur = (e) => {
    typeof props.onBlur === 'function' && props.onBlur(e)
    focused.value = false
}

const handleInputFocus = (e) => {
    typeof props.onFocus === 'function' && props.onFocus(e)
    focused.value = true
}

const handleChange = (e) => {
    openDropdown()

    const date = parseDate(e.target.value)
    if (dayjs(date).isValid()) {
        setValue(date)
        setLastValidValue(date)
        props.closePickerOnChange && (inputState.value = e.target.value)
        calendarMonth.value = date
    } else {
        props.closePickerOnChange && (inputState.value = e.target.value)
    }
}

const handleTimeChange = (time) => {
    const newDateTime = new Date(
        _value.getFullYear(),
        _value.getMonth(),
        _value.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
    )
    setValue(newDateTime)

    if (!props.value && !props.closePickerOnChange) {
        inputState.value = capitalize(dayjs(newDateTime).locale(finalLocale.value).format(dateFormat.value))
    }

    props.closePickerOnChange &&
        (inputState.value = capitalize(dayjs(newDateTime).locale(finalLocale.value).format(dateFormat.value)))
    props.closePickerOnChange && closeDropdown()
}

const handleOk = () => {
    inputState.value = capitalize(dayjs(_value).locale(finalLocale.value).format(dateFormat.value))
    closeDropdown()
    window.setTimeout(() => inputRef.value?.focus(), 0)
    props.onChange?.(_value)
}

onMounted(() => {
    finalLocale.value = props.locale || themeLocale
    dateFormat.value = props.inputFormat || DEFAULT_INPUT_FORMAT
})
</script>
