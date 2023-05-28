<script setup>
import { inject, provide, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import classNames from 'classnames'

const props = defineProps({
    variant: {
        type: String,
        default: 'light',
        validator(value) {
            return ['light', 'dark', 'themed', 'transparent'].includes(value)
        },
    },
    menuItemHeight: {
        type: Number,
        default: 40,
    },
    sideCollapsed: Boolean,
    defaultExpandedKeys: { type: Array, default: () => [] },
    defaultActiveKeys: { type: Array, default: () => [] },
})

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)
const { class: className, ...restAttrs } = useAttrs()

const menuDefaultClass = 'menu'
const menuColor = () => {
    if (props.variant === 'themed') {
        return `bg-${themeColor}-${primaryColorLevel} ${menuDefaultClass}-${props.variant}`
    }
    return `${menuDefaultClass}-${props.variant}`
}

const menuClass = classNames(menuDefaultClass, menuColor(), className)
const emits = defineEmits(['select'])

const emitOnSelect = (value) => emits('select', value)
provide('menu', {
    emits: emitOnSelect,
    menuItemHeight: props.menuItemHeight,
    variant: props.variant,
    sideCollapsed: props.sideCollapsed,
    defaultExpandedKeys: props.defaultExpandedKeys,
    defaultActiveKeys: props.defaultActiveKeys,
})
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <nav :class="menuClass" v-bind="restAttrs"><slot /></nav>
</template>
