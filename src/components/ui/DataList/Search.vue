<script setup>
import { debounce } from 'lodash'
import { ref } from 'vue'
import Input from '../Input'

defineProps({
    placeholder: {
        type: String,
        default: 'Search...',
    },
    value: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['input'])

const emitEvent = debounce((event) => {
    emits('input', event.target.value)
})

const input = ref(null)

const reset = () => emits('input', '')

const focus = () => input.value.focus()

defineExpose({ reset, focus })
</script>

<template>
    <Input
        ref="input"
        size="sm"
        type="text"
        :placeholder="placeholder"
        :value="value"
        focus
        class="input-text flex-1 bg-white text-sm focus:border-blue-300 outline-0 mt-2"
        @input="emitEvent"
        @keyup.esc="reset"
    />
</template>

<style scoped></style>
