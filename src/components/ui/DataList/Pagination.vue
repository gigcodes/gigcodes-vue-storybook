<script setup>
import { computed } from 'vue'
import Pagination from '../Pagination'

const props = defineProps({
    inline: {
        type: Boolean,
        default: false,
    },
    showTotals: {
        type: Boolean,
        default: false,
    },
    perPage: {
        type: Number,
    },
    resourceMeta: {
        type: Object,
        required: true,
    },
    scrollToTop: {
        type: Boolean,
        default: true,
    },
})

const emit = defineEmits(['page-selected'])

const totalPages = computed(() => props.resourceMeta.last_page)

const currentPage = computed(() => props.resourceMeta.current_page)

const totalItems = computed(() => props.resourceMeta.total)
</script>
<template>
    <Pagination
        :display-total="showTotals"
        :page-size="totalPages"
        :current-page="currentPage"
        :total="totalItems"
        :scroll-to-top="scrollToTop"
        @change="emit('page-selected')"
    />
</template>
