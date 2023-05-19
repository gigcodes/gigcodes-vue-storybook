import { ref, computed, watch, onMounted } from 'vue'

export default function useControllableState({ prop, defaultProp, onChange = () => {} }) {
    const uncontrolledProp = useUncontrolledState({ defaultProp, onChange })
    const isControlled = computed(() => prop !== undefined)
    const value = computed(() => (isControlled.value ? prop : uncontrolledProp.value))

    const setValue = (nextValue) => {
        const setter = nextValue
        if (isControlled.value) {
            const value = typeof nextValue === 'function' ? setter(prop) : nextValue
            if (value !== prop) {
                onChange(value)
            }
        } else {
            uncontrolledProp.value = nextValue
        }
    }

    return [value, setValue]
}

function useUncontrolledState({ defaultProp, onChange }) {
    const value = ref(defaultProp)
    const prevValueRef = ref(value.value)

    onMounted(() => {
        watch(value, (newValue) => {
            if (prevValueRef.value !== newValue) {
                onChange(newValue)
                prevValueRef.value = newValue
            }
        })
    })

    return value
}
