<script setup>
import { debounce } from 'lodash'
import { ref } from 'vue'

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
    <input
        ref="input"
        type="text"
        :placeholder="placeholder"
        :value="value"
        autofocus
        class="input-text flex-1 bg-white text-sm focus:border-blue-300 outline-0"
        @input="emitEvent"
        @keyup.esc="reset"
    />
</template>

<style scoped></style>
