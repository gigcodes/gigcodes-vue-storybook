<template>
    <span v-bind="restAttrs" :class="classes" :style="avatarStyles">
        <img v-if="src" :class="imgClass" :src="src" :srcSet="srcSet" :alt="alt" loading="lazy" />
        <span v-if="slots.icon" :class="iconClass"><slot name="icon"></slot></span>
        <span v-else ref="avatarChildren" :class="avatarChildrenClass" :style="avatarChildrenStyles"><slot /> </span>
    </span>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { watch, onMounted, ref as reference, useAttrs, useSlots } from 'vue'
import { SHAPES, SIZES } from '../utils/constant'
import classNames from 'classnames'

const props = defineProps({
    shape: {
        type: String,
        default: SHAPES.ROUNDED,
        validator(value) {
            return [SHAPES.ROUNDED, SHAPES.SQUARE, SHAPES.CIRCLE].includes(value)
        },
    },
    size: {
        type: [String, Number],
        default: SIZES.MD,
        validator(value) {
            if (typeof value == 'number') {
                return true
            } else {
                return [SIZES.SM, SIZES.MD, SIZES.LG].includes(value)
            }
        },
    },
    src: {
        required: false,
        type: String,
    },
    srcSet: {
        required: false,
        type: String,
    },
    alt: {
        required: false,
        type: String,
    },
})
const scale = reference(1)
const avatarChildren = reference(null)
const avatarNode = reference(null)
const { class: className, style, ...restAttrs } = useAttrs()
const slots = useSlots()
const innerScale = () => {
    if (!avatarChildren.value || !avatarNode.value) {
        return
    }
    const avatarChildrenWidth = avatarChildren.value.offsetWidth
    const avatarNodeWidth = avatarNode.value.offsetWidth
    if (avatarChildrenWidth === 0 || avatarNodeWidth === 0) {
        return
    }
    scale.value = avatarNodeWidth - 8 < avatarChildrenWidth ? (avatarNodeWidth - 8) / avatarChildrenWidth : 1
}

watch(
    () => [scale],
    () => innerScale()
)

onMounted(() => innerScale())

const sizeStyle =
    typeof props.size === 'number'
        ? {
              width: `${props.size}px`,
              height: `${props.size}px`,
              minWidth: `${props.size}px`,
              lineHeight: `${props.size}px`,
              fontSize: `${props.size}px` / 2,
          }
        : {}
const classes = classNames(
    'avatar',
    `avatar-${props.shape}`,
    typeof props.size === 'string' ? `avatar-${props.size}` : '',
    className
)
const imgClass = `avatar-img avatar-${props.shape}`
const iconClass = classNames('avatar-icon', `avatar-icon-${props.size}`)
const childrenSizeStyle = typeof props.size === 'number' ? { lineHeight: `${props.size}px` } : {}
const stringCentralized = {
    transform: `translateX(-50%) scale(${scale.value})`,
}
const avatarChildrenStyles = {
    ...childrenSizeStyle,
    ...stringCentralized,
    ...(typeof props.size === 'number' ? { height: props.size } : {}),
}
const avatarChildrenClass = `avatar-string ${typeof props.size === 'number' ? '' : `avatar-inner-${props.size}`}`
const avatarStyles = { ...sizeStyle, ...style }
</script>
