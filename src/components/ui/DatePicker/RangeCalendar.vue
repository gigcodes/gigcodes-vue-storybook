<script setup>
import { ref, provide } from 'vue'
import { isSameDate } from './utils/index.js'
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

        const result = [date, pickedDate.value]
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

provide('hoveredDay', hoveredDay)
provide('pickedDate', pickedDate)
</script>
<template>
    <CalendarBase
        :day-style="dayStyle"
        :value="pickedDate"
        :range="value"
        :date-view-count="dateViewCount"
        :paginate-by="paginateBy || dateViewCount"
        :hide-out-of-month-dates="dateViewCount > 1"
        @mouseleave="handleMouseLeave"
        @day-mouse-enter="({ value }) => (hoveredDay = value)"
        @change="setRangeDate"
    />
</template>
<style lang="scss" scoped></style>
