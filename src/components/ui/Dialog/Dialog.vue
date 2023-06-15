<script setup>
import useWindowSize from '../utils/useWindowSize.js'
import { onUnmounted, ref, toRefs, useAttrs, watch } from 'vue'
import classNames from 'classnames'
import { Dialog, DialogPanel } from '@headlessui/vue'
import CloseButton from '@/components/ui/CloseButton/CloseButton.vue'
import { Motion, Presence } from 'motion/vue'

defineOptions({
    inheritAttrs: false,
})
const props = defineProps({
    closable: {
        type: Boolean,
        default: true,
    },
    isOpen: {
        type: Boolean,
        required: true,
    },
    overlayClassName: String,
    width: {
        type: [String, Number],
        default: 520,
    },
    height: [String, Number],
    portalClassName: String,
    contentClassName: String,
    closeTimeoutMS: {
        type: Number,
        default: 150,
    },
    bodyOpenClassName: String,
})

const currentSize = useWindowSize()

const { class: className, style, ...restAttrs } = useAttrs()
const emit = defineEmits(['close'])
const { width, height } = toRefs(props)

const contentStyle = ref({
    content: {
        inset: 'unset',
    },
    ...style,
})

if (width.value !== undefined) {
    contentStyle.value.content.width = `${width.value}px`
    if (currentSize.width <= parseInt('640px'.split(/ /)[0].replace(/[^\d]/g, ''))) {
        contentStyle.value.content.width = 'auto'
    }
}
if (height.value !== undefined) {
    contentStyle.value.content.height = height.value
}

const defaultDialogContentClass = 'dialog-content'
const enterStyle = { opacity: 1 }
const exitStyle = { opacity: 0, transition: { duration: 0.15, easing: 'ease-in-out' } }
const initialStyle = exitStyle

const dialogClass = classNames(defaultDialogContentClass, props.contentClassName)
watch(
    () => props.isOpen,
    (val) => {
        if (val) {
            document.body.classList.add(classNames('dialog-open', props.bodyOpenClassName))
        } else {
            document.body.classList.remove(classNames('dialog-open', props.bodyOpenClassName))
        }
    }
)

onUnmounted(() => {
    document.body.classList.remove(classNames('dialog-open', props.bodyOpenClassName))
})
</script>
<template>
    <Dialog
        as="div"
        :open="isOpen"
        class="dialog-portal"
        v-bind="restAttrs"
        :class="portalClassName"
        @close="() => emit('close')"
    >
        <Presence class="dialog-overlay" :class="overlayClassName">
            <Motion
                :initial="initialStyle"
                :animate="enterStyle"
                :exit="exitStyle"
                :transition="{ duration: 0.15, easing: 'ease-in-out' }"
            >
                <DialogPanel
                    class="dialog dialog-after-open"
                    tabindex="-1"
                    :style="contentStyle.content"
                    :class="className"
                >
                    <div :class="dialogClass">
                        <CloseButton
                            v-if="closable"
                            class="ltr:right-6 rtl:left-6"
                            absolute
                            @click="() => emit('close')"
                        />
                        <slot />
                    </div>
                </DialogPanel>
            </Motion>
        </Presence>
    </Dialog>
</template>
