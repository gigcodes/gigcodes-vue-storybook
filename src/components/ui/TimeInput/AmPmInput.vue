<template>
    <div>
        <input
            ref="hoursRef"
            v-model="time.hours"
            @input="handleHoursChange($event.target.value, time.minutes)"
            :class="timeFieldClass"
            :size="size"
            :max="format === '12' ? 12 : 23"
            :placeholder="timeFieldPlaceholder"
            aria-label="hours"
            :disabled="disabled"
            :name="name"
        />
        <input
            ref="minutesRef"
            v-model="time.minutes"
            @input="handleMinutesChange($event.target.value, time.seconds)"
            :class="timeFieldClass"
            :size="size"
            :max="59"
            :placeholder="timeFieldPlaceholder"
            aria-label="minutes"
            :disabled="disabled"
        />
        <input
            v-if="showSeconds"
            ref="secondsRef"
            v-model="time.seconds"
            @input="handleSecondsChange($event.target.value)"
            :class="timeFieldClass"
            :size="size"
            :max="59"
            :placeholder="timeFieldPlaceholder"
            aria-label="seconds"
            :disabled="disabled"
        />
        <am-pm-input
            v-if="format === '12'"
            ref="amPmRef"
            v-model="time.amPm"
            @change="handleAmPmChange"
            :placeholder="amPmPlaceholder"
            :am-label="amLabel"
            :pm-label="pmLabel"
            :size="size"
            aria-label="am pm"
            :disabled="disabled"
        ></am-pm-input>
    </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { getTimeValues, getDate, createAmPmHandler, createTimeHandler } from './utils';

export default {
  name: 'TimeInput',
  props: {
    amLabel: {
      type: String,
      default: 'am'
    },
    amPmPlaceholder: {
      type: String,
      default: 'am'
    },
    className: String,
    clearable: {
      type: Boolean,
      default: true
    },
    defaultValue: [Date, String],
    disabled: Boolean,
    format: {
      type: String,
      default: '24'
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
      default: 'pm'
    },
    prefix: String,
    showSeconds: {
      type: Boolean,
      default: false
    },
    size: String,
    style: Object,
    suffix: {
      type: Object,
      default: () => null
    },
    timeFieldPlaceholder: {
      type: String,
      default: '--'
    },
    timeFieldClass: String,
    value: [Date, String]
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const hoursRef = ref(null);
    const minutesRef = ref(null);
    const secondsRef = ref(null);
    const amPmRef = ref(null);
    const time = reactive(
      getTimeValues(props.value || props.defaultValue, props.format, props.amLabel, props.pmLabel)
    );

    watch(
      () => [props.value, props.format, props.amLabel, props.pmLabel],
      () => {
        time = getTimeValues(props.value || props.defaultValue, props.format, props.amLabel, props.pmLabel);
      }
    );

    watch(
      () => props.value,
      () => {
        if (props.value && props.value.getTime() !== time.getTime()) {
          emit('update:modelValue', props.value);
        }
      }
    );

    const setDate = (change) => {
      const timeWithChange = { ...time, ...change };
      const newDate = getDate(
        timeWithChange.hours,
        timeWithChange.minutes,
        timeWithChange.seconds,
        props.format,
        props.pmLabel,
        timeWithChange.amPm
      );
      emit('update:modelValue', newDate);
      emit('change', newDate);
    };

    const handleHoursChange = createTimeHandler({
      onChange: (val, carryOver) => {
        setDate({
          hours: val,
          minutes: carryOver ?? time.minutes
        });
      },
      min: props.format === '12' ? 1 : 0,
      max: props.format === '12' ? 12 : 23,
      nextRef: minutesRef,
      nextMax: 59
    });

    const handleMinutesChange = createTimeHandler({
      onChange: (val, carryOver) => {
        setDate({
          minutes: val,
          seconds: carryOver ?? time.seconds
        });
      },
      min: 0,
      max: 59,
      nextRef: props.showSeconds ? secondsRef : props.format === '12' ? amPmRef : props.nextRef,
      nextMax: props.showSeconds ? 59 : undefined
    });

    const handleSecondsChange = createTimeHandler({
      onChange: (val) => {
        setDate({ seconds: val });
      },
      min: 0,
      max: 59,
      nextRef: props.format === '12' ? amPmRef : props.nextRef
    });

    const handleAmPmChange = createAmPmHandler({
      amLabel: props.amLabel,
      pmLabel: props.pmLabel,
      onChange: (val) => {
        setDate({ amPm: val });
      },
      nextRef: props.nextRef
    });

    const handleClear = () => {
      time.hours = '';
      time.minutes = '';
      time.seconds = '';
      time.amPm = '';
      emit('update:modelValue', null);
      emit('change', null);
      hoursRef.value.focus();
    };

    const suffixSlot = props.clearable && props.value ? (
      <close-button @click="handleClear" />
  ) : (
      props.suffix
    );

    return {
      time,
      hoursRef,
      minutesRef,
      secondsRef,
      amPmRef,
      handleHoursChange,
      handleMinutesChange,
      handleSecondsChange,
      handleAmPmChange,
      handleClear,
      suffixSlot
    };
  }
};
</script>
