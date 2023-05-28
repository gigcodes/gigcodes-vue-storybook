<script setup>
import { computed } from 'vue'
import classNames from 'classnames'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    currentPage: Number,
    pageCount: Number,
    pagerClass: Object,
})

const disabled = computed(() => props.currentPage === props.pageCount || props.pageCount === 0)
const emits = defineEmits(['next'])
const onNextClick = (e) => {
    if (disabled.value) return null
    else emits('next', e)
}
</script>
<template>
    <span
        :class="
            classNames(
                pagerClass.default,
                'pagination-pager-next',
                disabled ? pagerClass.disabled : pagerClass.inactive
            )
        "
        @click="onNextClick"
    >
        <ChevronRightIcon />
    </span>
</template>
