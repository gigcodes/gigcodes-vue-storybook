<template>
    <div
        v-bind="$attrs"
        ref="stepItemRef"
        class="step-item"
        :class="[`step-item-${status}`, vertical && 'step-item-vertical', className]"
        @click="handleStepChange"
    >
        <div class="step-item-wrapper">
            <div
                class="step-item-icon"
                :class="[
                    `step-item-icon-${status}`,
                    status === COMPLETE ? `bg-${color} text-white` : '',
                    status === ERROR ? 'step-item-icon-error' : '',
                    status === IN_PROGRESS
                        ? `text-${color} dark:text-gray-100 border-${color} step-item-icon-current`
                        : '',
                ]"
            >
                <span v-if="slots.icon"><slot name="icon" /></span>
                <span v-else>
                    <component :is="STEP_STATUS_ICON[status]" v-if="STEP_STATUS_ICON[status]" class="h-4" />
                    <template v-else>{{ stepNumber }}</template>
                </span>
            </div>
            <div v-if="title" class="step-item-content">
                <span
                    class="step-item-title"
                    :class="[
                        status === ERROR ? 'step-item-title-error' : '',
                        status !== ERROR ? `hover:text-${color}` : '',
                    ]"
                >
                    {{ title }}
                </span>
                <span v-if="description && vertical" class="step-item-description">
                    {{ description }}
                </span>
            </div>
        </div>
        <div
            v-if="!isLast"
            class="step-connect"
            :class="[vertical && 'step-connect-vertical', status === COMPLETE ? `bg-${color}` : 'inactive']"
        />
    </div>
</template>

<script setup>
import { inject, ref, useSlots } from 'vue'
import PropTypes from 'vue-types'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { DEFAULT_CONFIG, STEPS_STATUS } from '../utils/constant'

const { COMPLETE, PENDING, IN_PROGRESS, ERROR } = STEPS_STATUS

const STEP_STATUS_ICON = {
    [COMPLETE]: CheckIcon,
    [PENDING]: null,
    [IN_PROGRESS]: null,
    [ERROR]: XMarkIcon,
}

defineProps({
    className: PropTypes.string,
    status: PropTypes.oneOf([
        STEPS_STATUS.COMPLETE,
        STEPS_STATUS.PENDING,
        STEPS_STATUS.IN_PROGRESS,
        STEPS_STATUS.ERROR,
    ]),
    stepNumber: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isLast: PropTypes.bool,
    vertical: PropTypes.bool,
})

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const color = `${themeColor}-${primaryColorLevel}`
const slots = useSlots()
const emits = defineEmits(['stepChange'])

const stepItemRef = ref(null)

const handleStepChange = () => {
    emits('stepChange')
}
</script>
