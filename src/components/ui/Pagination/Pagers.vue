<script setup>
import { computed, ref, watch } from 'vue'
import classNames from 'classnames'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/outline'

const PAGER_COUNT = 7

const props = defineProps({
    pageCount: Number,
    currentPage: Number,
    pagerClass: Object,
})
const showPrevMore = ref(false)
const showNextMore = ref(false)
watch(
    () => [props.currentPage, props.pageCount],
    () => {
        if (props.pageCount > PAGER_COUNT) {
            if (props.currentPage > PAGER_COUNT - 2) {
                showPrevMore.value = true
            }
            if (props.currentPage < props.pageCount - 2) {
                showNextMore.value = true
            }
            if (props.currentPage >= props.pageCount - 3 && props.currentPage <= props.pageCount) {
                showNextMore.value = false
            }
            if (props.currentPage >= 1 && props.currentPage <= 4) {
                showPrevMore.value = false
            }
        } else {
            showPrevMore.value = false
            showNextMore.value = false
        }
    }
)

const emits = defineEmits(['change'])

const onPagerClick = (value) => {
    let newPage = value

    if (newPage < 1) {
        newPage = 1
    }
    if (newPage > props.pageCount) {
        newPage = props.pageCount
    }

    if (newPage !== props.currentPage) {
        emits('change', newPage)
    }
}

const onArrowClick = (e) => {
    let newPage = props.currentPage
    if (e === 'nextMore') {
        newPage = props.currentPage + 5
    }
    if (e === 'prevMore') {
        newPage = props.currentPage - 5
    }
    emits('change', newPage)
}

const getPages = computed(() => {
    const pagerArray = []
    if (showPrevMore.value && !showNextMore.value) {
        const startPage = props.pageCount - (PAGER_COUNT - 2)
        for (let i = startPage; i < props.pageCount; i++) {
            pagerArray.push(i)
        }
    } else if (!showPrevMore.value && showNextMore.value) {
        for (let i = 2; i < PAGER_COUNT; i++) {
            pagerArray.push(i)
        }
    } else if (showPrevMore.value && showNextMore.value) {
        const offset = Math.floor(PAGER_COUNT / 2) - 1
        const maxRange = props.currentPage >= props.pageCount - 2 && props.currentPage <= props.pageCount
        for (let i = props.currentPage - offset; i <= props.currentPage + (maxRange ? 0 : offset); i++) {
            pagerArray.push(i)
        }
    } else {
        for (let i = 2; i < props.pageCount; i++) {
            pagerArray.push(i)
        }
    }
    if (pagerArray.length > PAGER_COUNT - 2) {
        return []
    }

    return pagerArray
})

const getPagerClass = (index) => {
    return classNames(
        props.pagerClass.default,
        props.currentPage === index ? props.pagerClass.active : props.pagerClass.inactive
    )
}

const quickPrevArrowIcon = ref(false)
const quickNextArrowIcon = ref(false)
</script>
<template>
    <ul>
        <li v-if="pageCount > 0" :class="getPagerClass(1)" tabindex="0" @click.prevent="onPagerClick(1)">1</li>
        <li
            v-if="showPrevMore"
            :class="classNames(pagerClass.default, pagerClass.inactive)"
            @mouseleave="quickPrevArrowIcon = false"
            @mouseenter="quickPrevArrowIcon = true"
            @click.prevent="onArrowClick('prevMore')"
        >
            <ChevronDoubleLeftIcon v-if="quickPrevArrowIcon"></ChevronDoubleLeftIcon>
            <EllipsisHorizontalIcon v-else />
        </li>
        <li
            v-for="(page, index) in getPages"
            :key="index"
            :class="getPagerClass(page)"
            tabindex="0"
            @click.prevent="onPagerClick(page)"
        >
            {{ page }}
        </li>
        <li
            v-if="showNextMore"
            :class="classNames(pagerClass.default, pagerClass.inactive)"
            @mouseleave="quickNextArrowIcon = false"
            @mouseenter="quickNextArrowIcon = true"
            @click.prevent="onArrowClick('nextMore')"
        >
            <ChevronDoubleRightIcon v-if="quickNextArrowIcon"></ChevronDoubleRightIcon>
            <EllipsisHorizontalIcon v-else />
        </li>
        <li
            v-if="pageCount > 1"
            :class="getPagerClass(pageCount)"
            tabindex="0"
            @click.prevent="onPagerClick(pageCount)"
        >
            {{ pageCount }}
        </li>
    </ul>
</template>
