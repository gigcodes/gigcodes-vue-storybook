<script setup>
import { inject, computed, ref } from 'vue'
import ToggleAll from './ToggleAll.vue'
// import draggable from 'vuedraggable'
import TableField from './TableField.vue'
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    allowBulkActions: {
        default: false,
        type: Boolean,
    },
    toggleSelectionOnRowClick: {
        type: Boolean,
        default: false,
    },
    sortable: {
        type: Boolean,
        default: true,
    },
    reorderable: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
    },
})

const sharedState = inject('sharedState')
const emit = defineEmits(['sorted', 'row-clicked', 'selected', 'deselected'])
const shifting = ref(false)
const lastItemClicked = ref(false)
// const drag = ref(false)
const table = ref(null)

const rows = computed({
    get: () => sharedState.value.rows,
    set: (newRows) => {
        sharedState.value.rows = newRows
    },
})
const reachedSelectionLimit = computed(() => sharedState.value.selections.length === sharedState.value.maxSelections)
const singleSelect = computed(() => sharedState.value.maxSelections === 1)

const visibleColumns = computed(() => {
    const columns = sharedState.value.columns.filter((column) => column.visible)
    return columns.length ? columns : sharedState.value.columns
})

const sortableColumns = computed(() =>
    sharedState.value.columns.filter((column) => column.sortable).map((column) => column.field)
)

const isSelected = (id) => {
    return sharedState.value.selections.includes(id)
}

const relativeColumnsSize = computed(() => {
    if (visibleColumns.value.length <= 4) return 'sm'
    if (visibleColumns.value.length <= 8) return 'md'
    if (visibleColumns.value.length >= 12) return 'lx'
    return 'xl'
})

const swapSortDirection = () => {
    sharedState.value.currentPage = 1
    sharedState.value.sortDirection = sharedState.value.sortDirection === 'asc' ? 'desc' : 'asc'
}

const getFieldtype = (columnName) => {
    const field = sharedState.value.columns.find((field) => columnName === field.field)
    return field ? field.fieldtype : null
}

const actualIndex = (row) => sharedState.value.originalRows.findIndex((r) => r === row)

const changeSortColumn = (column) => {
    if (!props.sortable) return

    if (!sortableColumns.value.includes(column)) {
        return
    }

    // If sorting by the same column, flip the direction
    if (sharedState.value.sortColumn === column) {
        swapSortDirection()
        // Always start sorting by asc unless column is a date field
    } else if (getFieldtype(column) !== 'date') {
        sharedState.value.sortDirection = 'asc'
    }

    sharedState.value.currentPage = 1
    sharedState.value.sortColumn = column
    emit('sorted', sharedState.value.sortColumn, sharedState.value.sortDirection)
}

const checkboxClicked = (row, index, $event) => {
    const checkbox = $event.target
    const checked = checkbox.checked
    const id = checkbox.value

    if (singleSelect.value && checked) {
        sharedState.value.selections = [id]
        emit('selected', [id])
    } else if (checked && !sharedState.value.selections.includes(id)) {
        sharedState.value.selections.push(id)
        emit('selected', [id])
    } else if (!checked) {
        const index = sharedState.value.selections.indexOf(id)
        if (index > -1) {
            sharedState.value.selections.splice(index, 1)
            emit('deselected', [id])
        }
    }
}

// eslint-disable-next-line no-unused-vars
const toggleRowSelection = (row, index, $event) => {
    // const checkbox = $refs[`checkbox-${row.id}`]
    // if (checkbox) {
    //     checkbox.checked = !checkbox.checked
    // }
    // checkboxClicked(row, index, $event)
}

const selectRange = (event) => {
    if (!shifting.value || !lastItemClicked.value) {
        return
    }

    const checkboxes = Array.from(table.value.querySelectorAll('input[type="checkbox"]'))
    const currentIndex = checkboxes.findIndex((checkbox) => checkbox === lastItemClicked.value)
    const clickedIndex = checkboxes.findIndex((checkbox) => checkbox === event.target)

    if (currentIndex === -1 || clickedIndex === -1) {
        return
    }

    const start = Math.min(currentIndex, clickedIndex)
    const end = Math.max(currentIndex, clickedIndex)

    for (let i = start; i <= end; i++) {
        checkboxes[i].checked = true
        checkboxClicked(sharedState.value.rows[i], i, { target: checkboxes[i] })
    }
}

const rowClicked = (row, index, $event) => {
    if (props.toggleSelectionOnRowClick) {
        toggleRowSelection(row, index, $event)
    } else {
        emit('row-clicked', row, actualIndex(row), $event)
    }
}
const shiftDown = ($event) => {
    if ($event.shiftKey) {
        shifting.value = true
        lastItemClicked.value = $event.target
    }
}
const clearShift = () => {
    shifting.value = false
    lastItemClicked.value = null
}
</script>
<template>
    <table
        ref="table"
        :data-size="relativeColumnsSize"
        tabindex="0"
        class="data-table"
        :class="{ 'select-none': shifting }"
        @keydown.shift="shiftDown"
        @keyup="clearShift"
    >
        <thead v-if="allowBulkActions || visibleColumns.length > 1">
            <tr>
                <th
                    v-if="allowBulkActions || reorderable"
                    :class="{ 'checkbox-column': !reorderable, 'handle-column': reorderable }"
                >
                    <ToggleAll v-if="allowBulkActions && !singleSelect" ref="toggleAll" />
                </th>
                <th
                    v-for="column in visibleColumns"
                    :key="column.field"
                    :class="{
                        'current-column': sharedState.sortColumn === column.field,
                        'sortable-column': column.sortable === true,
                        'cursor-not-allowed': !sortable,
                        'text-right pr-8': column.numeric,
                    }"
                    class="group"
                    @click.prevent="changeSortColumn(column.field)"
                >
                    <span v-text="column.label" />
                    <svg
                        :class="[
                            sharedState.sortDirection,
                            { 'opacity-100 pointer-events-none': sharedState.sortColumn === column.field },
                        ]"
                        height="8"
                        width="8"
                        viewBox="0 0 10 6.5"
                        class="ml-1 opacity-0 group-hover:opacity-100"
                    >
                        <path d="M9.9,1.4L5,6.4L0,1.4L1.4,0L5,3.5L8.5,0L9.9,1.4z" fill="currentColor" />
                    </svg>
                </th>
                <th v-if="type" class="type-column">
                    <template v-if="type === 'entries'">Collection</template>
                    <template v-if="type === 'terms'">Taxonomy</template>
                </th>
                <th class="actions-column" />
            </tr>
        </thead>
        <tbody>
            <slot name="tbody-start" />
            <tr
                v-for="(row, index) in rows"
                :key="row.id"
                class="sortable-row outline-none"
                :class="{ 'row-selected': sharedState.selections.includes(row.id) }"
            >
                <td v-if="reorderable" class="table-drag-handle"></td>
                <th v-if="allowBulkActions && !reorderable" class="checkbox-column">
                    <input
                        v-if="!reorderable"
                        :id="`checkbox-${row.id}`"
                        type="checkbox"
                        :value="row.id"
                        :checked="isSelected(row.id)"
                        :disabled="reachedSelectionLimit && !singleSelect && !isSelected(row.id)"
                        @click="checkboxClicked(row, index, $event)"
                    />
                </th>
                <td
                    v-for="column in visibleColumns"
                    :key="column.field"
                    :width="column.width"
                    :class="{ 'text-right pr-8': column.numeric }"
                    @click="rowClicked(row, index, $event)"
                >
                    <slot
                        :name="`cell-${column.field}`"
                        :value="row[column.value || column.field]"
                        :values="row"
                        :row="row"
                        :index="actualIndex(row)"
                        :display-index="index"
                        :checkbox-id="`checkbox-${row.id}`"
                    >
                        <TableField
                            :key="column.field"
                            :handle="column.field"
                            :value="row[column.value || column.field]"
                            :values="row"
                            :fieldtype="column.fieldtype"
                        />
                    </slot>
                </td>
                <td v-if="type" class="type-column">
                    <span
                        v-if="type === 'entries' || type === 'terms'"
                        class="rounded px-1 py-px text-2xs uppercase bg-gray-200 text-gray"
                    >
                        <template v-if="type === 'entries'">{{ row.collection.title }}</template>
                        <template v-if="type === 'terms'">{{ row.taxonomy.title }}</template>
                    </span>
                </td>
                <th class="actions-column">
                    <slot name="actions" :row="row" :index="actualIndex(row)" :display-index="index"></slot>
                </th>
            </tr>
        </tbody>
    </table>
</template>
