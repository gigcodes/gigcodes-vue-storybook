<template></template>
<script setup>
const props = defineProps({
  closable: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  overlayClassName: String,
  width: {
    type: [String, Number],
    default: 520,
  },
  height: [String, Number],
  portalClassName: String,
  contentClassName: String,
  closeTimeoutMS: {
    type: Number,
    default: 150,
  },
  bodyOpenClassName: Number,
});
</script>
