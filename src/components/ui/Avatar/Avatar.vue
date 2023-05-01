<template></template>

<script setup>
const props = defineProps({
    shape: {
        type: String,
        validator(value) {
            return ['rounded', 'square', 'circle'].includes(value)
        },
        default: 'rounded',
    },
    size: {
        type: String,
        validator(value) {
            return ['sm', 'md', 'lg'].includes(value)
        },
        default: 'md',
    },
    src: {
        required: true,
        type: String,
    },
    srcSet: {
        required: false,
        type: String,
    },
    alt: {
        required: false,
        type: String,
    },
})
</script>
