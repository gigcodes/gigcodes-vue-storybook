<script setup>
import useUniqueId from '@/components/hooks/useUniqueId'
import { ref, useAttrs, useSlots, watch } from 'vue'
import Input from '../Input'
import TimeInput from './TimeInput.vue'
import CloseButton from '../CloseButton'

const props = defineProps({
    invalid: Boolean,
    showSeconds: Boolean,
    clearable: Boolean,
    format: {
        type: String,
        default: '24',
    },
    timeFieldPlaceholder: {
        type: String,
        default: '--',
    },
    amPmPlaceholder: {
        type: String,
        default: 'am',
    },
    seperator: {
        type: String,
        default: '~',
    },
    disabled: Boolean,
    size: String,
    id: String,
    modelValue: {
        type: Array,
        default: () => [null, null],
    },
    name: String,
    amLabel: String,
    pmLabel: String,
    field: String,
    form: String,
    timeFieldClass: String,
})

const emit = defineEmits(['update:modelValue'])
defineOptions({
    inheritAttrs: false,
})
const { class: className, style, ...restAttrs } = useAttrs()

const uuid = useUniqueId(props.id)

const fromTimeRef = ref()

const toTimeRef = ref()

const value = ref(props.modelValue)

watch(value, (val) => emit('update:modelValue', val))

const handleClear = () => {
    value.value = [null, null]
    fromTimeRef.value?.focus()
}
const slots = useSlots()

const forwardProps = {
    amPmPlaceholder: props.amPmPlaceholder,
    disabled: props.disabled,
    format: props.format,
    size: props.size,
    timeFieldPlaceholder: props.timeFieldPlaceholder,
    showSeconds: props.showSeconds,
}

const focusTimeRef = () => fromTimeRef.value?.focus()
</script>

<template>
    <Input
        as-element="div"
        :invalid="invalid"
        :size="size"
        :class="className"
        :style="style"
        :disabled="disabled"
        v-bind="restAttrs"
        @click="focusTimeRef"
    >
        <template #suffix>
            <CloseButton v-if="clearable && value" @click="handleClear" />
            <slot v-else-if="slots" name="suffix"></slot>
        </template>
        <template v-if="slots.prefix" #prefix>
            <slot name="prefix"></slot>
        </template>
        <div class="time-input-wrapper">
            <TimeInput
                v-bind="forwardProps"
                :id="uuid"
                ref="fromTimeRef"
                v-model="value[0]"
                :name="name"
                :next-ref="toTimeRef"
                :clearable="false"
                unstyle
                :suffix="false"
            />
            <span class="time-input-separator">{{ seperator }}</span>
            <TimeInput
                ref="toTimeRef"
                v-model="value[1]"
                unstyle
                v-bind="forwardProps"
                :clearable="false"
                :suffix="false"
            />
        </div>
    </Input>
</template>
