<template>
    <div :class="progressClass" ref="ref">
        <Line v-if="variant === SHAPES.LINE" :strokeColor="strokeColor" :percent="percent" v-bind="restAttrs">
            <template v-if="showInfo" #info>
                <span :class="infoClass">
                    <slot name="customInfo" />
                    <template v-if="!slots.customInfo">{{ `${percent}%` }}</template>
                </span>
            </template>
        </Line>
        <Circle
            v-if="variant === SHAPES.CIRCLE"
            :strokeColor="strokeColor"
            :trailColor="progressTrailColor"
            :width="width"
            :gapDegree="gapDegree"
            :gapPosition="gapPosition"
            :percent="percent"
            :strokeLinecap="strokeLinecap"
            :strokeWidth="strokeWidth"
            v-bind="restAttrs"
        >
            <template v-if="showInfo" #info>
                <span :class="infoClass">
                    <slot name="customInfo" />
                    <template v-if="!slots.customInfo">{{ `${percent}%` }}</template>
                </span>
            </template>
        </Circle>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { inject, useAttrs, ref as reference, useSlots } from 'vue'
import { DEFAULT_CONFIG, DIRECTIONS, SIZES, SHAPES } from '../utils/constant'
import classNames from 'classnames'
import Line from '../ProgressBar/Line.vue'
import Circle from '../ProgressBar/Circle.vue'

const ref = reference(null)
const { class: className, ...restAttrs } = useAttrs()
const slots = useSlots()
const props = defineProps({
    color: String,
    gapDegree: {
        type: Number,
        default: 0,
    },
    gapPosition: {
        type: String,
        default: DIRECTIONS.TOP,
        validator(value) {
            return [DIRECTIONS.TOP, DIRECTIONS.RIGHT, DIRECTIONS.BOTTOM, DIRECTIONS.LEFT].includes(value)
        },
    },
    percent: {
        type: [Number, String],
        default: 0,
    },
    showInfo: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        default: SIZES.MD,
        validator(value) {
            return [SIZES.SM, SIZES.MD].includes(value)
        },
    },
    strokeLinecap: {
        type: String,
        default: SHAPES.ROUND,
        validator(value) {
            return [SHAPES.ROUND, SHAPES.SQUARE].includes(value)
        },
    },
    strokeWidth: {
        type: Number,
        default: 6,
    },
    variant: {
        type: String,
        default: SHAPES.LINE,
        validator(value) {
            return [SHAPES.LINE, SHAPES.CIRCLE].includes(value)
        },
    },
    width: {
        type: [Number, String],
        default: 120,
    },
})
const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)
const strokeColor = props.color || `${themeColor}-${primaryColorLevel}`
const progressTrailColor = 'gray-100'
const progressClass = classNames('progress', className, props.variant === SHAPES.CIRCLE ? SHAPES.CIRCLE : SHAPES.LINE)
const infoClass = `progress-info ${props.variant}`

defineExpose({ ref })
</script>
