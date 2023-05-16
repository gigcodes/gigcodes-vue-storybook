<script setup>
import 'floating-vue/dist/style.css'
import { Tooltip } from 'floating-vue'

defineProps({
    message: {
        type: String,
        required: true,
    },
    isOpen: Boolean,
    placement: {
        type: String,
        default: 'top',
        validator(value) {
            return [
                'auto',
                'auto-start',
                'auto-end',
                'top',
                'top-start',
                'top-end',
                'right',
                'right-start',
                'right-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
            ].includes(value)
        },
    },
})
</script>
<template>
    <Tooltip class="tooltip-wrapper" :placement="placement" :shown="isOpen">
        <template #popper> <div v-html="message" /></template>
        <slot />
    </Tooltip>
</template>
