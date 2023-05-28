<script setup>
import { computed, inject, useAttrs } from 'vue'
import classNames from 'classnames'

const props = defineProps({
    value: {
        type: [String, Number],
        required: true,
    },
})

const { modelValue } = inject('tabs', {})
const isSelected = computed(() => props.value === modelValue.value)
const { class: className, ...restAttrs } = useAttrs()
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <div
        role="tabpanel"
        tabIndex="{0}"
        :class="classNames('tab-content', isSelected && 'tab-content-active', className)"
        v-bind="restAttrs"
    >
        <slot v-if="isSelected" />
    </div>
</template>
