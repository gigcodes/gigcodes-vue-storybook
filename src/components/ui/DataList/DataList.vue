<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue'
import Fuse from 'fuse.js'

const props = defineProps({
    columns: {
        type: Array,
        default: () => [],
    },
    rows: {
        type: Array,
        required: true,
    },
    searchQuery: {
        type: String,
        default: '',
    },
    selections: {
        type: Array,
        default: () => [],
    },
    maxSelections: {
        type: Number,
    },
    sort: {
        type: Boolean,
        default: true,
    },
    sortColumn: String,
    sortDirection: {
        type: String,
        default: 'asc',
    },
})

const emit = defineEmits(['selections-updated', 'visible-columns-updated'])

const sharedState = ref({
    searchQuery: props.searchQuery,
    columns: props.columns,
    sortColumn: null,
    sortDirection: props.sortDirection,
    rows: [],
    originalRows: props.rows,
    selections: props.selections,
    maxSelections: props.maxSelections,
})

provide('sharedState', sharedState.value)

const visibleColumns = computed(() => {
    return sharedState.value.columns.filter((column) => column.visible)
})

const searchableColumns = computed(() => {
    const rows = sharedState.value.rows
    return visibleColumns.value.length ? visibleColumns.value.map((column) => column.field) : Object.keys(rows[0])
})

const filterBySearch = (rows) => {
    if (!sharedState.value.searchQuery) return rows

    const fuse = new Fuse(rows, {
        findAllMatches: true,
        threshold: 0.1,
        minMatchCharLength: 2,
        keys: searchableColumns.value,
    })

    return fuse.search(sharedState.value.searchQuery)
}

const sortRows = (rows) => {
    if (!props.sort) return rows

    // If no column is selected, don't sort.
    if (!sharedState.value.sortColumn) return rows

    rows = _.sortBy(rows, sharedState.value.sortColumn)

    if (sharedState.value.sortDirection === 'desc') {
        rows = rows.reverse()
    }

    return rows
}

const filteredRows = computed(() => {
    let rows = props.rows
    rows = filterBySearch(rows)
    return sortRows(rows)
})

watch(
    filteredRows,
    (rows) => {
        sharedState.value.rows = rows
    },
    { immediate: true }
)

watch(
    () => props.selections,
    (selections) => {
        sharedState.value.selections = selections
    }
)

watch(
    () => sharedState.value.selections,
    (selections) => {
        emit('selections-updated', selections)
    }
)

watch(
    () => props.columns,
    (columns) => {
        sharedState.value.columns = columns
    }
)

watch(
    () => props.sortColumn,
    (column) => {
        sharedState.value.sortColumn = column
    }
)

watch(visibleColumns, (columns) => {
    emit('visible-columns-updated', columns)
})

onMounted(() => {
    setInitialSortColumn()
})

const setInitialSortColumn = () => {
    const columns = sharedState.value.columns

    if (columns.length === 0) return

    let firstVisibleColumn = visibleColumns.value[0]
    firstVisibleColumn = firstVisibleColumn ? firstVisibleColumn.field : columns[0].field
    sharedState.value.sortColumn = props.sortColumn || (props.sort ? firstVisibleColumn : null)
}

const clearSelections = () => {
    sharedState.value.selections = []
}

defineExpose({
    clearSelections,
})
</script>

<template>
    <slot :rows="filteredRows" :has-selections="sharedState.selections.length > 0" />
</template>
