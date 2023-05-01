<template>
    <div class="progress-wrapper">
        <div class="progress-inner">
            <div :class="progressBackgroundClass" :style="lineStyle"></div>
        </div>
    </div>
    <slot name="info" />
</template>
<script setup>
import classNames from 'classnames'
import { SIZES } from '../utils/constant'

const props = defineProps({
    strokeColor: String,
    size: String,
    percent: [Number, String],
})
const progressBackgroundClass = classNames(
    'progress-bg',
    props.size === SIZES.SM ? 'h-1.5' : 'h-2',
    `bg-${props.strokeColor}`
)
const lineStyle = { width: `${props.percent}%` }
</script>
