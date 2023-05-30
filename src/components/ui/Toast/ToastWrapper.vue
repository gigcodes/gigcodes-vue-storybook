<script setup>
import { h, ref, useAttrs } from 'vue'
import PropTypes from 'vue-types'
import { PLACEMENT } from '@/components/ui/utils/constant.js'
import { getPlacementTransition } from '@/components/ui/Toast/transition.js'
import classNames from 'classnames'
import chainedFunction from '@/components/ui/utils/chainedFunction.js'
import { Motion, Presence } from 'motion/vue'
// import { Motion, Presence } from 'motion/vue'

const props = defineProps({
    placement: PropTypes.oneOf([
        PLACEMENT.TOP_START,
        PLACEMENT.TOP_CENTER,
        PLACEMENT.TOP_END,
        PLACEMENT.BOTTOM_START,
        PLACEMENT.BOTTOM_CENTER,
        PLACEMENT.BOTTOM_END,
    ]).def(PLACEMENT.TOP_END),
    offsetX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(30),
    offsetY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).def(30),
    transitionType: PropTypes.oneOf(['scale', 'fade']).def('scale'),
    block: PropTypes.bool.def(false),
    messageKey: PropTypes.string,
})

const useMessages = (msgKey) => {
    let messages = ref([])

    const getKey = (key) => {
        if (typeof key === 'undefined' && messages.value.length) {
            key = messages.value[messages.value.length - 1].key
        }
        return key
    }

    const push = (message) => {
        const key = msgKey || '_' + Math.random().toString(36).substr(2, 12)
        messages.value = [...messages.value, { key, visible: true, node: message }]
        return key
    }

    const removeAll = () => {
        messages.value = messages.value.map((msg) => ({ ...msg, visible: false }))
        setTimeout(() => {
            messages.value = []
        }, 50)
    }

    const remove = (key) => {
        messages.value = messages.value.map((elm) => {
            if (elm.key === getKey(key)) {
                elm.visible = false
            }
            return elm
        })

        setTimeout(() => {
            messages.value = messages.value.filter((msg) => msg.visible)
        }, 50)
    }
    return { messages, push, removeAll, remove }
}
const rootRef = ref(null)
const { messages, remove, push, removeAll } = useMessages(props.messageKey)

defineExpose({ root: rootRef, push, removeAll, remove })
const placementTransition = getPlacementTransition({
    offsetX: props.offsetX,
    offsetY: props.offsetY,
    placement: props.placement,
    transitionType: props.transitionType,
})

const { class: className, ...restAttrs } = useAttrs()

const toastProps = {
    triggerByToast: true,
    ...restAttrs,
}

const renderNode = (item) =>
    h(item.node, {
        ...toastProps,
        onClose: chainedFunction(item.node?.onClose, () => remove(item.key)),
        class: classNames(item.node?.attrs?.class),
    })
</script>

<template>
    <div ref="rootRef" :style="placementTransition.default" :class="classNames(className, 'toast', block && 'w-full')">
        <template v-for="(item, key) in messages" :key="key">
            <Presence>
                <Motion
                    :initial="placementTransition.variants.initial"
                    :animate="placementTransition.variants.animate"
                    :exit="placementTransition.variants.exit"
                >
                    <component :is="renderNode(item)" v-show="item.visible" />
                </Motion>
            </Presence>
        </template>
    </div>
</template>
<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
