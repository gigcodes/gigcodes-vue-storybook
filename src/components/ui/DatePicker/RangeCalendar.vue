<script setup>
import { ref } from 'vue'
import { isSameDate } from './utils/index.js'
import dayjs from 'dayjs'
import CalendarBase from './CalendarBase.vue'

const props = defineProps({
    value: [Array, Date],
    dayStyle: Object,
    singleDate: Boolean,
    dateViewCount: { type: Number, default: 1 },
    paginateBy: Boolean,
})

const hoveredDay = ref(null)
const pickedDate = ref(null)

const emit = defineEmits(['change', 'mouseLeave'])
const setRangeDate = (date) => {
    if (pickedDate.value instanceof Date) {
        if (isSameDate(date, pickedDate.value) && !props.singleDate) {
            pickedDate.value = null
            hoveredDay.value = null
            return null
        }

        const result = [date, pickedDate]
        result.sort((a, b) => a.getTime() - b.getTime())
        emit('change', result)
        pickedDate.value = null
        return null
    }

    if (props.value[0] && isSameDate(date, props.value[0]) && !props.singleDate) {
        pickedDate.value = null
        hoveredDay.value = null
        emit('change', [null, null])
        return null
    }

    emit('change', [date, null])
    pickedDate.value = date
    return null
}

const handleMouseLeave = (e) => {
    emit('mouseLeave', e)
    hoveredDay.value = null
}

const shouldHighlightDate = (date, modifiers) => {
    if (pickedDate.value instanceof Date && hoveredDay.value instanceof Date) {
        const result = [hoveredDay, pickedDate]
        result.sort((a, b) => a.getTime() - b.getTime())
        return (
            !modifiers.selected &&
            dayjs(date).subtract(1, 'day').isBefore(result[1]) &&
            dayjs(date).add(1, 'day').isAfter(result[0])
        )
    }

    return false
}

const isPickedDateFirstInRange = (date, modifiers) => {
    if (pickedDate.value instanceof Date && hoveredDay.value instanceof Date) {
        const result = [hoveredDay, pickedDate]
        result.sort((a, b) => a.getTime() - b.getTime())
        return modifiers.selected && dayjs(date).isBefore(result[1])
    }

    return false
}

const isPickedDateLastInRange = (date, modifiers) => {
    if (pickedDate.value instanceof Date && hoveredDay.value instanceof Date) {
        const result = [hoveredDay, pickedDate]
        result.sort((a, b) => a.getTime() - b.getTime())
        return modifiers.selected && dayjs(date).isAfter(result[0])
    }

    return false
}
</script>
<template>
    <CalendarBase
        :day-style="dayStyle"
        :value="pickedDate"
        :range="value"
        :date-view-count="dateViewCount"
        :paginate-by="paginateBy || dateViewCount"
        :hide-out-of-month-dates="dateViewCount > 1"
        :is-date-in-range="shouldHighlightDate"
        :is-date-first-in-range="isPickedDateFirstInRange"
        :is-date-last-in-range="isPickedDateLastInRange"
        @mouseleave="handleMouseLeave"
        @day-mouse-enter="(date) => (hoveredDay = date)"
        @change="setRangeDate"
    />
</template>
<style lang="scss" scoped></style>
