<script setup>
import { ref, computed, watch } from 'vue'
import hasFilters from '../DataList/hasFilters'
import hasPagination from '../DataList/hasPagination'
import hasActions from '../DataList/hasActions'
import { utf8btoa } from '../utils/globals'
import axios from 'axios'
import { createToaster } from '../Toast'
import { indexOf, findWhere } from 'lodash'
import usePreferences from '../DataList/hasPreferences'
import LoadingGraphic from '../LoadingGraphic/LoadingGraphic.vue'
import Card from '../Card'
import DataList from '../DataList/DataList.vue'
import FilterPresets from '../DataList/FilterPresets.vue'
import Search from '../DataList/Search.vue'
import Button from '../Buttons'
import ColumnPicker from '../DataList/ColumnPicker.vue'
import DataListPagination from '../DataList/Pagination.vue'
import ListFilters from '../DataList/ListFilters.vue'
import Table from '../DataList/Table.vue'
import BulkActions from '../DataList/BulkActions.vue'
import InlineActions from '../DataList/InlineActions.vue'
import { Dropdown } from '../Dropdown'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    initialSortColumn: String,
    initialSortDirection: String,
    initialColumns: {
        type: Array,
        default: () => [],
    },
    initialRows: {
        type: Array,
        default: () => [],
    },
    filters: Array,
    actionUrl: String,
    collection: String,
    reordering: Boolean,
    reorderUrl: String,
    site: String,
    requestUrl: String,
})

const preferencesPrefix = ref(`collection.${props.collection}`)
const listingKey = 'entries'
const dataList = ref(null)
const intialPerPage = 10

const source = ref(null)
const initializing = ref(true)
const loading = ref(true)
const items = ref([])
const columns = ref(props.initialColumns)
const rows = ref(props.initialRows)
const visibleColumns = ref(props.initialColumns.filter((column) => column.visible))
const sortColumn = ref(props.intialSortColumn)
const sortDirection = ref(props.initalSortDirection)
const meta = ref(null)
const additionalParameters = computed(() => ({}))

const {
    activeFilters,
    autoApplyFilters,
    activeFilterBadges,
    searchQuery,
    isDirty,
    searchPlaceholder,
    activePreset,
    activePresetPayload,
    hasActiveFilters,
    selectPreset,
    filtersReset,
    activeFilterCount,
    filterChanged,
} = hasFilters({
    dataList,
    preferencesPrefix,
    handleShowFilters: undefined,
})
const { hasPreferences, preferencesKey, setPreference } = usePreferences(undefined)
const { page, perPage, resetPage, selectPage } = hasPagination({ hasPreferences, setPreference, intialPerPage })
const activeFilterParameters = computed(() => utf8btoa(JSON.stringify(activeFilters.value)))

const actionContext = computed(() => {
    return props.collection
})

const parameters = computed(() =>
    Object.assign(
        {
            sort: sortColumn.value,
            order: sortDirection.value,
            page: page.value,
            perPage: perPage.value,
            search: searchQuery.value,
            filters: activeFilterParameters.value,
            columns: visibleColumns.value.map((column) => column.field).join(','),
        },
        additionalParameters.value
    )
)

const shouldRequestFirstPage = computed(() => {
    if (page.value > 1 && items.value.length === 0) {
        selectPage(1)
        return true
    }
    return false
})

const request = () => {
    if (!props.requestUrl) {
        loading.value = false
        return
    }

    loading.value = true
    if (source.value) source.value.cancel()
    source.value = axios.CancelToken.source()

    // const apiService = inject('apiService', undefined)

    axios
        .get(props.requestUrl, {
            params: parameters.value,
            cancelToken: source.value.token,
        })
        .then((response) => {
            columns.value = response.data.meta.columns
            activeFilterBadges.value = { ...response.data.meta.activeFilterBadges }
            items.value = Object.values(response.data.data)
            meta.value = response.data.meta
            if (shouldRequestFirstPage.value) return request()
            loading.value = false
            initializing.value = false
            afterRequestCompleted(response)
        })
        .catch((e) => {
            if (axios.isCancel(e)) return
            loading.value = false
            initializing.value = false
            createToaster.danger(e.response ? e.response.data.message : 'Something went wrong')
        })
}

const { actionStarted, actionCompleted } = hasActions({ loading, request })

// eslint-disable-next-line no-unused-vars
const afterRequestCompleted = (_response) => {}

const sorted = (column, direction) => {
    sortColumn.value = column
    sortDirection.value = direction
}

const removeRow = (row) => {
    if (!rows.value) return
    else {
        let id = row.id
        let i = indexOf(rows, findWhere(rows.value, { id }))
        rows.value.splice(i, 1)
        if (rows.value.length === 0) location.reload()
    }
}

const reordered = (i) => {
    items.value = i
}

autoApplyFilters()
request()

watch(
    parameters,
    (after, before) => {
        if (before.search !== after.search) return
        if (JSON.stringify(before) === JSON.stringify(after)) return
        request()
    },
    { deep: true }
)

watch(searchQuery, () => {
    sortColumn.value = null
    sortDirection.value = null
    resetPage()
    request()
})

watch(
    loading,
    () => {
        console.log(listingKey)
    },
    { immediate: true }
)

defineExpose({ removeRow })
</script>
<template>
    <div>
        <Card v-if="initializing">
            <LoadingGraphic />
        </Card>
        <DataList
            v-if="!initializing"
            ref="dataList"
            :rows="items"
            :columns="columns"
            :sort="false"
            :sort-column="sortColumn"
            :sort-direction="sortDirection"
            @visible-columns-updated="visibleColumns = $event"
        >
            <template #default>
                <div class="card p-0 relative">
                    <div class="flex flex-wrap items-center justify-between px-2 pb-2 text-sm border-b">
                        <FilterPresets
                            ref="presets"
                            :active-preset="activePreset"
                            :active-preset-payload="activePresetPayload"
                            :active-filters="activeFilters"
                            :has-active-filters="hasActiveFilters"
                            :preferences-prefix="preferencesPrefix"
                            :search-query="searchQuery"
                            @selected="selectPreset"
                            @reset="filtersReset"
                        />
                        <Search ref="search" v-model="searchQuery" :placeholder="searchPlaceholder" />
                        <div class="flex space-x-2 mt-2">
                            <Button v-show="isDirty" class="ml-2" size="sm" @click="$refs.presets.refreshPreset()">
                                Reset
                            </Button>
                            <Button v-show="isDirty" class="ml-2" size="sm" @click="$refs.presets.savePreset()">
                                Save
                            </Button>
                            <ColumnPicker :preferences-key="preferencesKey('columns')" />
                        </div>
                    </div>
                    <div v-show="!reordering">
                        <ListFilters
                            ref="filters"
                            :filters="filters"
                            :active-preset="activePreset"
                            :active-preset-payload="activePresetPayload"
                            :active-filters="activeFilters"
                            :active-filter-badges="activeFilterBadges"
                            :active-count="activeFilterCount"
                            :search-query="searchQuery"
                            :is-searching="true"
                            :saves-presets="true"
                            :preferences-prefix="preferencesPrefix"
                            @changed="filterChanged"
                            @saved="$refs.presets.setPreset($event)"
                            @deleted="$refs.presets.refreshPresets()"
                        />
                    </div>
                    <div v-show="items.length === 0" class="p-6 text-center text-gray-500" v-text="'No results'" />
                    <BulkActions
                        :url="actionUrl"
                        :context="actionContext"
                        @started="actionStarted"
                        @completed="actionCompleted"
                    />
                    <div class="overflow-x-auto overflow-y-hidden">
                        <Table
                            v-show="items.length"
                            :allow-bulk-actions="!reordering"
                            :loading="loading"
                            :reorderable="reordering"
                            :sortable="!reordering"
                            :toggle-selection-on-row-click="true"
                            @sorted="sorted"
                            @reordered="reordered"
                        >
                            <template #actions="{ row: entry }">
                                <Dropdown placement="bottom-end">
                                    <template #renderTitle>
                                        <Button size="sm" variant="plain">
                                            <EllipsisHorizontalIcon class="h-4" />
                                        </Button>
                                    </template>
                                    <DropdownItem
                                        v-if="entry.viewable && entry.permalink"
                                        event-key="View"
                                        :external-link="entry.permalink"
                                    />
                                    <DropdownItem
                                        v-if="entry.editable"
                                        event-key="Edit"
                                        as-element="a"
                                        :href="entry.edit_url"
                                    />
                                    <DropdownItem v-if="entry.actions.length" variant="divider" />
                                    <InlineActions
                                        :item="entry.id"
                                        :url="actionUrl"
                                        :actions="entry.actions"
                                        @started="actionStarted"
                                        @completed="actionCompleted"
                                    />
                                </Dropdown>
                            </template>
                        </Table>
                    </div>
                </div>
                <DataListPagination
                    class="mt-6"
                    :resource-meta="meta"
                    :per-page="perPage"
                    show-totals
                    @page-selected="selectPage"
                />
            </template>
        </DataList>
    </div>
</template>
