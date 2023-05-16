<template>
    <div ref="avatarGroupRef" :class="avatarGroupClass" v-bind="restAttrs">
        <slot />
    </div>
</template>
<script setup>
import classNames from 'classnames'
import { computed, onMounted, ref as reference, useAttrs, watch } from 'vue'
const props = defineProps({
    chained: {
        type: Boolean,
        default: false,
    },
    maxCount: {
        type: Number,
        default: 3,
    },
    omittedAvatarTooltip: {
        type: Boolean,
        default: false,
    },
    omittedAvatarProps: {
        type: Object,
    },

    omittedAvatarContent: {
        type: [String],
    },
})
const { class: className, ...restAttrs } = useAttrs()
const avatarGroupRef = reference(null)

onMounted(() => {
    const childCount = avatarGroupRef.value.children.length
    const array = [...avatarGroupRef.value.children]
    const childWithKey = array.map((child, index) => console.log(child))
})

const avatarGroupClass = classNames('avatar-group', props.chained && 'avatar-group-chained', className)
</script>
