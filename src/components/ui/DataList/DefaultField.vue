<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    value: {
        type: [String, Number, Array],
        required: true,
    },
})

const truncateAt = ref(50)
const text = computed(() => {
    let value = props.value
    if (value === 0) return 0
    if (!value) return ''
    if (typeof value !== 'string') return JSON.stringify(value)
    // Basic html stripping. https://stackoverflow.com/a/5002161
    value = value.replace(/<\/?[^>]+(>|$)/g, '')
    if (value.length > truncateAt.value) {
        value = value.substring(0, truncateAt.value) + '&hellip;'
    }
    return value
})
const content = ref(text.value)

const onFocusOut = (e) => (content.value = e.target.innerHTML)

watch(text, (val) => (content.value = val))
</script>
<template>
    <div @focusout="onFocusOut($event)" v-html="content"></div>
</template>
