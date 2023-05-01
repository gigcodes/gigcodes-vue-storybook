<template>
    <span :class="`text-2xl ${iconColor ?? icon.color}`">
        <component :is="icon.icon" class="h-4" />
    </span>
</template>

<script setup>
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    type: {
        default: 'info',
        validator(value) {
            return ['info', 'success', 'warning', 'danger'].includes(value)
        },
    },
    iconColor: {
        default: null,
    },
})
const ICONS = {
    success: {
        color: 'text-emerald-400',
        icon: CheckCircleIcon,
    },
    info: {
        color: 'text-blue-400',
        icon: InformationCircleIcon,
    },
    warning: {
        color: 'text-yellow-400',
        icon: ExclamationCircleIcon,
    },
    danger: {
        color: 'text-red-400',
        icon: XCircleIcon,
    },
}

const icon = ICONS[props.type]
</script>
