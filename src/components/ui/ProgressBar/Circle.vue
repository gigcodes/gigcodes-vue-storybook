<template>
    <div class="progress-circle" :style="circleStyle">
        <span class="progress-circle-info"> <slot name="info" /></span>
        <svg viewBox="0 0 100 100">
            <path
                :d="pathString"
                :stroke-width="strokeWidth"
                fill-opacity="0"
                :style="trailPathStyle"
                class="progress-circle-trail"
            />
            <path
                :d="pathString"
                :stroke-linecap="strokeLinecap"
                :stroke-width="percent === 0 ? 0 : strokeWidth"
                fill-opacity="0"
                :style="strokePathStyle"
                :class="progressStrokeClass"
            />
        </svg>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { DIRECTIONS } from '../utils/constant'

const props = defineProps({
    gapDegree: Number,
    gapPosition: String,
    strokeColor: String,
    trailColor: String,
    percent: [Number, String],
    strokeLinecap: String,
    strokeWidth: Number,
    width: [Number, String],
})

const getPathStyles = computed(() => {
    const radius = 50 - props.strokeWidth / 2

    let beginPositionX = 0
    let beginPositionY = -radius
    let endPositionX = 0
    let endPositionY = -2 * radius

    switch (props.gapPosition) {
        case DIRECTIONS.LEFT:
            beginPositionX = -radius
            beginPositionY = 0
            endPositionX = 2 * radius
            endPositionY = 0
            break
        case DIRECTIONS.RIGHT:
            beginPositionX = radius
            beginPositionY = 0
            endPositionX = -2 * radius
            endPositionY = 0
            break
        case DIRECTIONS.BOTTOM:
            beginPositionY = radius
            endPositionY = 2 * radius
            break
        default:
    }

    const pathString = `M 50,50 m ${beginPositionX},${beginPositionY} a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY} a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`

    const len = Math.PI * 2 * radius
    const trailPathStyle = {
        strokeDasharray: `${len - props.gapDegree}px ${len}px`,
        strokeDashoffset: `-${props.gapDegree / 2}px`,
    }

    const strokePathStyle = {
        strokeDasharray: `${(props.percent / 100) * (len - props.gapDegree)}px ${len}px`,
        strokeDashoffset: `-${props.gapDegree / 2}px`,
    }
    return {
        pathString,
        trailPathStyle,
        strokePathStyle,
    }
})
const { pathString, trailPathStyle, strokePathStyle } = getPathStyles.value
const progressStrokeClass = `progress-circle-stroke text-${props.strokeColor}`
const circleStyle = { width: `${props.width}px` }
</script>
