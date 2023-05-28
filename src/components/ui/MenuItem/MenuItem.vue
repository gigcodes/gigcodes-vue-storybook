<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import classNames from 'classnames'
import { useAttrs } from 'vue'
const { class: className, style, ...restAttrs } = useAttrs()

const props = defineProps({
    asElement: {
        type: String,
        default: 'div',
    },
    menuItemHeight: {
        type: Number,
        default: 35,
    },
    disabled: Boolean,
    isActive: Boolean,
    variant: {
        type: String,
        default: 'light',
        validator(value) {
            return ['light', 'dark', 'themed', 'transparent'].includes(value)
        },
    },
})

const menuItemActiveClass = `menu-item-active`
const menuItemHoverClass = `menu-item-hoverable`
const disabledClass = 'menu-item-disabled'
const menuItemClass = classNames(
    'menu-item',
    `menu-item-${props.variant}`,
    props.isActive && menuItemActiveClass,
    props.disabled && disabledClass,
    !props.disabled && menuItemHoverClass,
    className
)
</script>

<template>
    <component
        :is="asElement"
        :class="menuItemClass"
        :style="{ height: `${menuItemHeight}px`, ...style }"
        v-bind="restAttrs"
    >
        <slot />
    </component>
</template>
