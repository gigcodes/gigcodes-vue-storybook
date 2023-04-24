<template>
  <span :class="['text-2xl', iconColor ?? icon.color]">
      <component v-if="icon?.icon" :is="icon.icon"/>
      <slot/>
  </span>
</template>

<script setup>
import {
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
    XCircleIcon
} from "@heroicons/vue/24/solid"

const props = defineProps({
    type: {
        default: "info",
        validator(value) {
            return ['info', 'success', 'warning', 'danger'].includes(value)
        }
    },
    iconColor: {
        default: null
    }
})
const ICONS = {
    success: {
        color: 'text-emerald-400',
        icon: CheckCircleIcon
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