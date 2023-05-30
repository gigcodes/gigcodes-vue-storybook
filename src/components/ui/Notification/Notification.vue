<template>
    <div v-if="display !== 'hide'" :class="classNames('notification', className)" :style="{ width }" v-bind="restAttrs">
        <div :class="['notification-content', !message && 'no-child']">
            <div v-if="type && !slots.customIcon" class="mr-3">
                <StatusIcon :type="type" />
            </div>
            <slot name="customIcon" />
            <div class="mr-4">
                <div :class="['notification-title', title && message && 'mb-1']">
                    {{ title }}
                </div>
                <div class="notification-description">
                    {{ message }}
                </div>
            </div>
        </div>
        <CloseButton
            v-if="closable"
            class="notification-close"
            :default-style="false"
            :absolute="true"
            @click="handleClose"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, useAttrs, useSlots } from 'vue'
import PropTypes from 'vue-types'
import classNames from 'classnames'
import StatusIcon from '../StatusIcon'
import CloseButton from '../CloseButton'

const props = defineProps({
    duration: PropTypes.number.def(3000),
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    title: PropTypes.any,
    closable: PropTypes.bool.def(false),
    width: PropTypes.number.def(350),
    triggerByToast: PropTypes.bool.def(false),
    message: PropTypes.string,
})

const emits = defineEmits(['close'])
const display = ref('show')

const emitOnClose = () => emits('close')
const slots = useSlots()
const handleClose = () => {
    display.value = 'hiding'
    emitOnClose()
    if (!props.triggerByToast) {
        setTimeout(() => {
            display.value = 'hide'
        }, 400)
    }
}
const { class: className, ...restAttrs } = useAttrs()

onMounted(() => {
    if (props.duration > 0) {
        setTimeout(() => handleClose(), props.duration)
    }
})
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
