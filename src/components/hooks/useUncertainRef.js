import { ref } from 'vue'

export default function useUncertainRef(initialValue) {
    const newRef = ref(initialValue)

    return (refValue) => {
        if (refValue) {
            return refValue
        }

        return newRef
    }
}
