<template>
    <li :class="classNames('timeline-item', { 'timeline-item-last': isLast }, className)" v-bind="restAttrs">
        <div class="timeline-item-wrapper">
            <div class="timeline-item-media">
                <div class="timeline-item-media-content">
                    <slot v-if="slots.media" name="media" />
                    <div v-else class="timeline-item-media-default" />
                </div>
                <div v-if="!isLast" class="timeline-connect" />
            </div>
            <div :class="classNames('timeline-item-content', isLast && 'timeline-item-content-last')">
                <slot />
            </div>
        </div>
    </li>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { useAttrs, useSlots } from 'vue'
import classNames from 'classnames'

defineProps({
    isLast: {
        type: Boolean,
        default: true,
    },
})

const { class: className, ...restAttrs } = useAttrs()
const slots = useSlots()
</script>
