<template>
    <CalendarBase :value="value" @change="handleChange" />
</template>

<script setup>
import CalendarBase from './CalendarBase.vue'
import { computed } from 'vue'
import { isSameDate } from './utils/index.js'

const emit = defineEmits(['change'])
const props = defineProps({
    multipleSelections: Boolean,
    value: [Array, Date],
})

const handleChange = (date) => {
    if (!props.multipleSelections) {
        return emit('change', date)
    }
    const isSelected = computed(() => props.value.some((val) => isSameDate(val, date)))
    emit('change', isSelected.value ? props.value.filter((val) => !isSameDate(val, date)) : [...props.value, date])
}
</script>
