import { ref } from 'vue'
import uniqueId from 'lodash/uniqueId'
import createUID from '@/components/ui/utils/createUID.js'

export default function useUniqueId(prefix, len) {
    const idRef = ref(null)

    if (!idRef.value) {
        idRef.value = `${uniqueId(prefix)}-${createUID(len)}`
    }

    return idRef.value
}
