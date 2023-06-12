<template>
    <Input
        :invalid="invalid"
        as-element="div"
        :size="size"
        aria-label="hours"
        :disabled="disabled"
        :name="name"
        :class="className"
        :style="style"
        v-bind="restAttrs"
        :field="field"
        :form="form"
        @click="() => hoursRef.focus()"
    >
        <template v-if="slots.prefix && prefix" #prefix>
            <slot name="prefix" />
        </template>
        <template v-if="suffix" #suffix>
            <CloseButton v-if="clearable && modelValue" @click="handleClear" />
            <slot v-else-if="slots?.suffix" name="suffix" />
            <ClockIcon v-else class="h-4" />
        </template>
        <div class="time-input-wrapper">
            <TimeInputField
                :id="uuid"
                ref="hoursRef"
                v-model="time.hours"
                :class="timeFieldClass"
                with-separator
                :size="size"
                :max="format === '12' ? 12 : 23"
                :placeholder="timeFieldPlaceholder"
                aria-label="hours"
                :disabled="disabled"
                :name="name"
                @change="handleHoursChange"
            />
            <TimeInputField
                ref="minutesRef"
                v-model="time.minutes"
                :class="timeFieldClass"
                :with-separator="showSeconds"
                :size="size"
                :max="59"
                :placeholder="timeFieldPlaceholder"
                aria-label="minutes"
                :disabled="disabled"
                @change="handleMinutesChange"
            />
            <TimeInputField
                v-if="showSeconds"
                ref="secondsRef"
                v-model="time.seconds"
                :class="timeFieldClass"
                :size="size"
                :max="59"
                :placeholder="timeFieldPlaceholder"
                aria-label="seconds"
                :disabled="disabled"
                @change="handleSecondsChange"
            />
            <AmPmInput
                v-if="format === '12'"
                ref="amPmRef"
                v-model="time.amPm"
                :placeholder="amPmPlaceholder"
                :am-label="amLabel"
                :pm-label="pmLabel"
                aria-label="am pm"
                :disabled="disabled"
                @change="handleAmPmChange"
            />
        </div>
    </Input>
</template>

<script setup>
import { ref, useAttrs, useSlots } from 'vue'
import { createAmPmHandler, createTimeHandler, getDate, getTimeValues } from './utils'
import useUniqueId from '@/components/hooks/useUniqueId'
import Input from '../Input'
import CloseButton from '../CloseButton'
import TimeInputField from './TimeInputField.vue'
import AmPmInput from './AmPmInput.vue'
import { ClockIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    amLabel: {
        type: String,
        default: 'am',
    },
    amPmPlaceholder: {
        type: String,
        default: 'am',
    },
    clearable: {
        type: Boolean,
        default: true,
    },
    disabled: Boolean,
    format: {
        type: String,
        default: '24',
    },
    field: Object,
    form: Object,
    id: String,
    invalid: Boolean,
    name: String,
    nextRef: Object,
    onChange: Function,
    pmLabel: {
        type: String,
        default: 'pm',
    },
    prefix: {
        type: Boolean,
        default: true,
    },
    showSeconds: Boolean,
    size: String,
    suffix: {
        type: Boolean,
        default: true,
    },
    timeFieldPlaceholder: {
        type: String,
        default: '--',
    },
    timeFieldClass: String,
    modelValue: [Date, String],
})

defineOptions({
    inheritAttrs: false,
})
const { class: className, style, ...restAttrs } = useAttrs()

const uuid = useUniqueId(props.id)
const slots = useSlots()
const emits = defineEmits(['update:modelValue', 'change'])
const hoursRef = ref(null)
const minutesRef = ref(null)
const secondsRef = ref(null)
const amPmRef = ref(null)
const time = ref(getTimeValues(props.modelValue, props.format, props.amLabel, props.pmLabel))

const setDate = (change) => {
    const timeWithChange = { ...time.value, ...change }
    const newDate = getDate(
        timeWithChange.hours,
        timeWithChange.minutes,
        timeWithChange.seconds,
        props.format,
        props.pmLabel,
        timeWithChange.amPm
    )
    time.value = getTimeValues(newDate, props.format, props.amLabel, props.pmLabel)
    emits('update:modelValue', newDate)
    emits('change', newDate)
}

const handleHoursChange = createTimeHandler({
    onChange: (val, carryOver) => {
        setDate({
            hours: val,
            minutes: carryOver ?? time.value.minutes,
        })
    },
    min: props.format === '12' ? 1 : 0,
    max: props.format === '12' ? 12 : 23,
    nextRef: minutesRef,
    nextMax: 59,
})

const handleMinutesChange = createTimeHandler({
    onChange: (val, carryOver) => {
        setDate({
            minutes: val,
            seconds: carryOver ?? time.value.seconds,
        })
    },
    min: 0,
    max: 59,
    nextRef: props.showSeconds ? secondsRef : props.format === '12' ? amPmRef : props.nextRef,
    nextMax: props.showSeconds ? 59 : undefined,
})

const handleSecondsChange = createTimeHandler({
    onChange: (val) => {
        setDate({ seconds: val })
    },
    min: 0,
    max: 59,
    nextRef: props.format === '12' ? amPmRef : props.nextRef,
})

const handleAmPmChange = createAmPmHandler({
    amLabel: props.amLabel,
    pmLabel: props.pmLabel,
    onChange: (val) => {
        setDate({ amPm: val })
    },
    nextRef: props.nextRef,
})

const handleClear = () => {
    time.value.hours = ''
    time.value.minutes = ''
    time.value.seconds = ''
    time.value.amPm = ''
    hoursRef.value.focus()
}

defineExpose({ focus: () => hoursRef.value.focus() })
</script>
