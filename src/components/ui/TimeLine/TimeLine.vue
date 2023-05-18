<template>
    <ul v-bind="restAttrs" ref="timeLineRef" :class="classNames('timeline', className)">
        <template v-for="(item, index) in items" :key="index">
            <component :is="item"></component>
        </template>
    </ul>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import classNames from 'classnames'
import { useAttrs, ref as reference, useSlots, h } from 'vue'

const { class: className, ...restAttrs } = useAttrs()
const timeLineRef = reference(null)
const slots = useSlots()

const items = slots.default().map((item, index, array) => {
    const isLast = index === array.length - 1
    return h(
        item.type,
        {
            ...item.props,
            isLast,
        },
        item.children
    )
})
</script>
