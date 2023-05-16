<template>
    <div ref="avatarGroupRef" :class="avatarGroupClass" v-bind="restAttrs">
        <slot />
        <template v-if="overflowCount">
            <Tooltip v-if="omittedAvatarTooltip" :message="`${overflowCount} More`">
                <Avatar class="cursor-pointer" v-bind="omittedAvatarProps" @click="emits('omittedAvatarClick')">
                    <slot v-if="slots.omittedAvatarContent" name="omittedAvatarContent" />
                    <template v-else>{{ `+${overflowCount}` }}</template>
                </Avatar>
            </Tooltip>
            <template v-else>
                <Avatar class="cursor-pointer" v-bind="omittedAvatarProps" @click="emits('omittedAvatarClick')">
                    <slot v-if="slots.omittedAvatarContent" name="omittedAvatarContent" />
                    <template v-else>{{ `+${overflowCount}` }}</template>
                </Avatar>
            </template>
        </template>
    </div>
</template>
<script setup>
import classNames from 'classnames'
import { onMounted, ref as reference, useAttrs, useSlots } from 'vue'
import { Avatar } from './index.js'
import Tooltip from '../Tooltip'

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
})
const { class: className, ...restAttrs } = useAttrs()
const slots = useSlots()
const avatarGroupRef = reference(null)
const childCount = reference(0)
const overflowCount = reference(0)
const emits = defineEmits(['omittedAvatarClick'])
onMounted(() => {
    childCount.value = avatarGroupRef.value.children.length
    const array = [...avatarGroupRef.value.children]
    if (props.maxCount && props.maxCount < childCount.value) {
        array.forEach((child, index) => {
            if (index >= props.maxCount) {
                child.remove()
                overflowCount.value++
            }
        })
    }
})

const avatarGroupClass = classNames('avatar-group', { 'avatar-group-chained': props.chained }, className)
</script>
