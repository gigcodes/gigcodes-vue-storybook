<script setup>
import { computed, inject, useAttrs } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import classNames from 'classnames'

const props = defineProps({
    value: String,
    disabled: Boolean,
})

const { modelValue, emits, variant } = inject('tabs', {})
const isSelected = computed(() => props.value === modelValue.value)
const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const onTabNavClick = () => {
    if (!isSelected.value && !props.disabled) {
        emits(props.value)
    }
}

const color = `${themeColor}-${primaryColorLevel}`
const { class: className, ...restAttrs } = useAttrs()
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <div
        :class="
            classNames(
                'tab-nav',
                `tab-nav-${variant}`,
                isSelected && `tab-nav-active text-${color} dark:text-${themeColor}-100`,
                isSelected && variant === 'underline' && `border-${color}`,
                isSelected && variant === 'pill' && `bg-${themeColor}-50 dark:bg-${color} dark:text-gray-100`,
                props.disabled && 'tab-nav-disabled',
                !props.disabled && !isSelected && `hover:text-${color} dark:hover:text-${themeColor}-100`,
                className
            )
        "
        role="tab"
        :aria-selected="isSelected"
        v-bind="restAttrs"
        @click="onTabNavClick"
    >
        <div v-if="$slots.icon" class="tab-nav-icon">
            <slot name="icon" />
        </div>
        <slot />
    </div>
</template>
