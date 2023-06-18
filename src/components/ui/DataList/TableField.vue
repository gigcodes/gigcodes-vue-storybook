<script setup>
import { computed } from 'vue'
import DefaultField from './DefaultField.vue'
const props = defineProps({
    handle: { type: String, required: true },
    value: { required: true, type: [String, Number, Object, Array] },
    values: { required: true, type: [String, Number, Object, Array] },
    fieldtype: String,
})

const component = computed(() => {
    //@todo allow custom field types in the filed as well
    // const fallback = DefaultField
    // const custom = `${props.fieldtype}-fieldtype-index`

    // if (!props.fieldtype) return fallback

    return DefaultField
})

const cssClass = computed(() => (props.fieldtype ? `${props.fieldtype}-index-field` : ''))
</script>
<template>
    <div><component :is="component" :class="cssClass" :handle="handle" :value="value" :values="values" /></div>
</template>
