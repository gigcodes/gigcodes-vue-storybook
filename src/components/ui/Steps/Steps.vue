<template>
    <div ref="stepsRef" :class="['steps', vertical ? 'steps-vertical' : '', className]" v-bind="$attrs">
        <template v-for="(item, i) in items" :key="i">
            <component :is="item" />
        </template>
    </div>
</template>

<script setup>
import { computed, provide, ref, useSlots } from 'vue'
import PropTypes from 'vue-types'
import classNames from 'classnames'
import { STEPS_STATUS } from '../utils/constant'
import mapCloneElement from '../utils/mapCloneElement'

const { COMPLETE, PENDING, ERROR } = STEPS_STATUS
const props = defineProps({
    className: PropTypes.string,
    vertical: PropTypes.bool.def(false),
    current: PropTypes.number.def(0),
    status: PropTypes.oneOf([
        STEPS_STATUS.COMPLETE,
        STEPS_STATUS.PENDING,
        STEPS_STATUS.IN_PROGRESS,
        STEPS_STATUS.ERROR,
    ]).def(STEPS_STATUS.IN_PROGRESS),
})

const emits = defineEmits(['change'])
const stepsRef = ref(null)
const slots = useSlots()

const count = computed(() => {
    return (slots.default() || []).length
})

const items = computed(() => {
    return mapCloneElement(slots.default(), (item, index) => {
        const itemStyles = {
            flexBasis: index < count.value - 1 ? `${100 / (count.value - 1)}%` : undefined,
            maxWidth: index === count.value - 1 ? `${100 / count.value}%` : undefined,
        }
        const itemProps = {
            stepNumber: index + 1,
            status: PENDING,
            style: !props.vertical ? itemStyles : undefined,
            isLast: index === count.value - 1,
            vertical: props.vertical,
            onStepChange: () => emits('change', index),
            ...item.props,
        }

        if (props.status === ERROR && index === props.current - 1) {
            itemProps.className = classNames('steps-item-error')
        }

        if (!item.props?.status) {
            if (index === props.current) {
                itemProps.status = props.status
                itemProps.className = classNames(itemProps.className, 'steps-item-active')
            } else if (index < props.current) {
                itemProps.status = COMPLETE
            }
        }

        return itemProps
    })
})

provide('stepsRef', stepsRef)
</script>
