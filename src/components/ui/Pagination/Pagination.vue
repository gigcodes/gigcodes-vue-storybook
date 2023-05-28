<script setup>
import { computed, inject, ref, useAttrs, watch } from 'vue'
import { DEFAULT_CONFIG } from '@/components/ui/utils/constant.js'
import classNames from 'classnames'
import Total from './Total.vue'
import Prev from './Prev.vue'
import Pagers from './Pagers.vue'
import Next from './Next.vue'

const props = defineProps({
    pageSize: {
        type: Number,
        default: 1,
    },
    currentPage: {
        type: Number,
        default: 1,
    },
    total: {
        type: Number,
        default: 5,
    },
    displayTotal: Boolean,
})

const emits = defineEmits(['change'])

const paginationTotal = ref(props.total)
const internalPageSize = ref(props.pageSize)
const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

const getInternalPageCount = computed(() => {
    if (typeof paginationTotal.value === 'number') {
        return Math.ceil(paginationTotal.value / internalPageSize.value)
    }
    return null
})

const getValidCurrentPage = (count) => {
    const value = parseInt(count, 10)
    const internalPageCount = getInternalPageCount
    let resetValue
    if (!internalPageCount.value) {
        if (isNaN(value) || value < 1) {
            resetValue = 1
        }
    } else {
        if (value < 1) {
            resetValue = 1
        }
        if (value > internalPageCount.value) {
            resetValue = internalPageCount
        }
    }

    if ((resetValue === undefined && isNaN(value)) || resetValue === 0) {
        resetValue = 1
    }

    return resetValue === undefined ? value : resetValue
}

const validCurrentPage = computed(() => getValidCurrentPage(props.currentPage))
const internalCurrentPage = ref(props.currentPage ? validCurrentPage.value : 1)

watch(
    () => [props.total, props.pageSize, props.currentPage],
    () => {
        if (props.total !== paginationTotal.value) {
            paginationTotal.value = props.total
        }

        if (props.pageSize !== internalPageSize.value) {
            internalPageSize.value = props.pageSize
        }

        if (props.currentPage !== internalCurrentPage.value) {
            internalCurrentPage.value = props.currentPage
        }
    }
)

const onPaginationChange = (val) => {
    internalCurrentPage.value = getValidCurrentPage(val)
    emits('change', getValidCurrentPage(val))
}

const onPrev = () => {
    const newPage = internalCurrentPage.value - 1
    internalCurrentPage.value = getValidCurrentPage(newPage)
    emits('change', getValidCurrentPage(newPage))
}

const onNext = () => {
    const newPage = internalCurrentPage.value + 1
    internalCurrentPage.value = getValidCurrentPage(newPage)
    emits('change', getValidCurrentPage(newPage))
}

const pagerClass = {
    default: 'pagination-pager',
    inactive: 'pagination-pager-inactive',
    active: `text-${themeColor}-${primaryColorLevel} bg-${themeColor}-50 hover:bg-${themeColor}-50 dark:bg-${themeColor}-${primaryColorLevel} dark:text-gray-100`,
    disabled: 'pagination-pager-disabled',
}
const { class: className, ...restAttrs } = useAttrs()
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <div :class="classNames('pagination', className)" v-bind="restAttrs">
        <Total v-if="displayTotal" :total="total" />
        <Prev :current-page="internalCurrentPage" :pager-class="pagerClass" @prev="onPrev" />
        <Pagers
            :page-count="getInternalPageCount"
            :current-page="internalCurrentPage"
            :pager-class="pagerClass"
            @change="onPaginationChange"
        />
        <Next
            :current-page="internalCurrentPage"
            :page-count="getInternalPageCount"
            :pager-class="pagerClass"
            @next="onNext"
        />
    </div>
</template>
