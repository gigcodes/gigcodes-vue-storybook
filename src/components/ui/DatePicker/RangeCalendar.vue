<script setup>
import { provide, ref } from 'vue'
import { isSameDate } from './utils/index.js'
import CalendarBase from './CalendarBase.vue'

const props = defineProps({
    modelValue: { type: [Array], default: null },
    dayStyle: Object,
    singleDate: Boolean,
    dateViewCount: { type: Number, default: 1 },
    paginateBy: Boolean,
})

const hoveredDay = ref(null)
const pickedDate = ref(null)
const _modelValue = ref(props.modelValue)
const emit = defineEmits(['change', 'mouseLeave', 'update:modelValue'])
const setRangeDate = (date) => {
    if (pickedDate.value instanceof Date) {
        if (isSameDate(date, pickedDate.value) && !props.singleDate) {
            pickedDate.value = null
            hoveredDay.value = null
            return null
        }

        const result = [date, pickedDate.value]
        result.sort((a, b) => a.getTime() - b.getTime())
        emit('change', result)
        emit('update:modelValue', result)
        _modelValue.value = result
        pickedDate.value = null
        return null
    }

    if (props.value?.[0] && isSameDate(date, props.value?.[0]) && !props.singleDate) {
        pickedDate.value = null
        hoveredDay.value = null
        _modelValue.value = [null, null]
        emit('change', [null, null])
        emit('update:modelValue', [null, null])
        return null
    }

    emit('change', [date, null])
    emit('update:modelValue', [date, null])
    _modelValue.value = [date, null]
    pickedDate.value = date
    return null
}

const handleMouseLeave = (e) => {
    emit('mouseLeave', e)
    hoveredDay.value = null
}

provide('hoveredDay', hoveredDay)
provide('pickedDate', pickedDate)
</script>
<template>
    <CalendarBase
        :day-style="dayStyle"
        :value="_modelValue"
        :range="modelValue"
        :date-view-count="dateViewCount"
        :paginate-by="paginateBy || dateViewCount"
        :hide-out-of-month-dates="dateViewCount > 1"
        @mouseleave="handleMouseLeave"
        @day-mouse-enter="({ value: val }) => (hoveredDay = val)"
        @change="setRangeDate"
    />
</template>
<style lang="scss" scoped></style>
