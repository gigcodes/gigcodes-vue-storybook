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
} = hasFilters({
    dataList,
    preferencesPrefix,
    handleShowFilters: undefined,
})
const { hasPreferences, preferencesKey, setPreference } = usePreferences(undefined)
const { page, perPage, resetPage, selectPage } = hasPagination({ hasPreferences, setPreference, intialPerPage })
const activeFilterParameters = computed(() => utf8btoa(JSON.stringify(activeFilters.value)))

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

const actions = hasActions({ loading, request })

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
            <template #default="{ hasSelections }">
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
                </div>
            </template>
        </DataList>
    </div>
</template>