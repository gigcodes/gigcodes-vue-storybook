import { ref, computed, watchEffect, onUnmounted } from 'vue'

function useTimeout(fn, ms = 0, open = true) {
    const timeout = ref()
    const clear = () => timeout.value && clearTimeout(timeout.value)

    const set = () => {
        timeout.value = open && setTimeout(() => fn, ms)
    }

    watchEffect(() => {
        set()
        return clear
    })

    onUnmounted(clear)

    const reset = computed(() => set)

    return { clear, reset }
}

export default useTimeout