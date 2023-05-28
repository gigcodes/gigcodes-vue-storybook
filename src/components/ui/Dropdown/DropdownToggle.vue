<script setup>
import { computed, useAttrs } from 'vue'
import PropTypes from 'vue-types'
import classNames from 'classnames'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/vue/20/solid'

const { class: className, ...restAttrs } = useAttrs()

const props = defineProps({
    placement: PropTypes.string,
    disabled: Boolean,
    hidden: Boolean,
    toggleClassName: PropTypes.string,
})

defineEmits(['context-menu'])

const toggleClass = 'dropdown-toggle'
const disabledClass = 'dropdown-toggle-disabled'

const dropdownToggleClass = computed(() =>
    classNames(toggleClass, className, props.toggleClassName, props.disabled && disabledClass)
)
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>

<template>
    <div v-if="$slots.renderTitle" :class="dropdownToggleClass" v-bind="restAttrs">
        <slot name="renderTitle" />
    </div>
    <div v-else :class="classNames(dropdownToggleClass, 'dropdown-toggle-default')" v-bind="restAttrs">
        <span class="flex items-center">
            <template v-if="placement && placement.includes('middle-start')">
                <slot />
                <ChevronRightIcon class="h-3" />
            </template>
            <template v-else-if="placement && placement.includes('middle-end')">
                <ChevronLeftIcon class="h-3" />
                <slot />
            </template>
            <template v-else-if="placement && placement.includes('top')">
                <slot />
                <ChevronUpIcon class="h-3" />
            </template>
            <template v-else><slot /><ChevronDownIcon class="h-3" /></template>
        </span>
    </div>
</template>
