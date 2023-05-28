<script setup>
import { computed } from 'vue'
import classNames from 'classnames'
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    currentPage: Number,
    pagerClass: Object,
})

const disabled = computed(() => props.currentPage <= 1)
const emits = defineEmits(['prev'])
const onPrevClick = (e) => {
    if (disabled.value) return null
    else emits('prev', e)
}
</script>
<template>
    <span
        :class="
            classNames(
                pagerClass.default,
                'pagination-pager-prev',
                disabled ? pagerClass.disabled : pagerClass.inactive
            )
        "
        @click="onPrevClick"
    >
        <ChevronLeftIcon />
    </span>
</template>
