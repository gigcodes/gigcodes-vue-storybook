<script setup>
import { flip, offset as floatingOffset, shift, useFloating } from '@floating-ui/vue'
import { ref, useAttrs, computed } from 'vue'
import Keys from '../../keys'
const keys = new Keys()
const trigger = ref(null)
const popover = ref(null)
defineOptions({
    inheritAttrs: false,
})

const { class: className, ...rest } = useAttrs()

const props = defineProps({
    autoclose: {
        type: Boolean,
        default: false,
    },
    clickaway: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    offset: {
        type: Array,
        default: () => [10, 0],
    },
    placement: {
        type: String,
        default: 'bottom-end',
    },
})
const emit = defineEmits(['closed', 'opened', 'clicked-away'])
const isOpen = ref(false)
const escBinding = ref(null)
const cleanupAutoUpdater = ref(null)

const targetClass = computed(() => className)

const close = () => {
    if (!isOpen.value) return

    isOpen.value = false
    emit('closed')
    cleanupAutoUpdater.value()

    if (escBinding.value) escBinding.value.destroy()
}

const open = () => {
    if (props.disabled) return
    isOpen.value = true
    escBinding.value = keys.bind('esc', () => close())
}

const middleware = ref([
    floatingOffset({ mainAxis: props.offset[0], crossAxis: props.offset[1] }),
    flip(),
    shift({ padding: 5 }),
])

const leave = () => props.autoclose && close()

const clickawayClose = () => {
    if (!props.clickaway || !isOpen.value) return
    close()
    emit('clicked-away')
}
const { floatingStyles } = useFloating(trigger, popover, {
    middleware,
})

const toggle = () => (isOpen.value ? close() : open())
</script>

<template>
    <div :class="{ 'popover-open': isOpen }" v-bind="rest" @mouseleave="leave">
        <div v-if="$slots.default" ref="trigger" aria-haspopup="true" :aria-expanded="isOpen" @click="toggle">
            <slot name="trigger"></slot>
        </div>
        <div :class="`popover-container ${targetClass || ''}`">
            <div :class="`${isOpen ? 'popover-open' : ''}`">
                <div
                    v-if="!disabled"
                    ref="popover"
                    v-click-away="clickawayClose"
                    class="popover"
                    :styles="floatingStyles"
                >
                    <div class="popover-content bg-white shadow-popover rounded-md">
                        <slot :close="close" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
