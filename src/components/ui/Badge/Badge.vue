<script setup>
import { computed, ref as refs, useAttrs, useSlots } from 'vue'
import classNames from 'classnames'

const props = defineProps({
    content: [String, Number],
    badgeClass: String,
    innerClass: String,
    badgeStyle: {
        type: Object,
        default: () => ({}),
    },
    maxCount: {
        type: Number,
        default: 99,
    },
})
const { class: className, ...restAttrs } = useAttrs()
const slots = useSlots()

const dot = computed(() => typeof props.content !== 'number' && typeof props.content !== 'string')
const badgeClass = classNames(dot.value ? 'badge-dot' : 'badge', props.innerClass)
const ref = refs()

defineExpose({ ref })
</script>

<template>
    <span v-if="slots.default" v-bind="restAttrs" ref="ref" :class="classNames('badge-wrapper', className)">
        <span :class="classNames(badgeClass, 'badge-inner')" :style="badgeStyle">
            {{ typeof content === 'number' && content > maxCount ? `${maxCount}+` : content }}
        </span>
        <slot />
    </span>
    <span v-else ref="ref" :class="classNames(badgeClass, className)" :style="badgeStyle" v-bind="restAttrs">
        {{ content }}
    </span>
</template>
