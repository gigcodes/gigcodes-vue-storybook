import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

const domContains = (context, node) => {
    if (context.contains) {
        return context.contains(node)
    } else if (context.compareDocumentPosition) {
        return context === node || !!(context.compareDocumentPosition(node) & 16)
    }
    if (node) {
        do {
            if (node === context) {
                return true
            }
        } while ((node = node.parentNode))
    }
    return false
}

const getRefTarget = (ref) => {
    return ref.value && ('value' in ref ? ref.value : ref.value)
}

function isLeftClickEvent(e) {
    return e?.button === 0
}

function isModifiedEvent(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e?.shiftKey)
}

function onEventListener(target, eventType, listener, options = false) {
    target.addEventListener(eventType, listener, options)

    return {
        off() {
            target.removeEventListener(eventType, listener, options)
        },
    }
}

function useRootClose(onRootClose, { disabled, triggerTarget, overlayTarget }) {
    const handleDocumentMouseDown = (event) => {
        const triggerElement = getRefTarget(triggerTarget)
        const overlayElement = getRefTarget(overlayTarget)

        if (triggerElement && domContains(triggerElement, event.target)) {
            return
        }

        if (overlayElement && domContains(overlayElement, event.target)) {
            return
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return
        }

        onRootClose?.(event)
    }

    const triggerTargetRef = ref(triggerTarget)

    onMounted(() => {
        const currentTarget = getRefTarget(triggerTargetRef)

        if (disabled || !currentTarget) return

        const doc = () => (currentTarget && currentTarget.ownerDocument) || document
        const onDocumentMouseDownListener = onEventListener(doc(), 'mousedown', handleDocumentMouseDown, true)

        watchEffect(() => {
            triggerTargetRef.value = triggerTarget
        })

        onUnmounted(() => {
            onDocumentMouseDownListener?.off()
        })
    })
}

export default useRootClose
