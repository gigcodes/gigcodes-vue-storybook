import { isEmpty, isEqual } from 'lodash'
import { ref, computed } from 'vue'
import keys from '../../keys'
const hasFilters = ({ preferencesPrefix, handleShowFilters, dataList }) => {
    const activeFilterBadges = ref({})
    const activeFilters = ref({})
    const activePreset = ref(null)
    const activePresetPayload = ref(null)
    const searchQuery = ref('')

    const activeFilterCount = computed(() => {
        let count = Object.keys(activeFilters.value).length

        if (activeFilters.value?.fields) {
            count = count + Object.keys(activeFilters.value.fields).filter((field) => field != 'badge').length - 1
        }
        return count
    })

    const canSave = computed(() => isDirty.value && preferencesPrefix.value)

    const isDirty = computed(() => {
        if (!isFiltering.value) return false
        if (activePreset.value) {
            return (
                activePresetPayload.value.query != searchQuery.value ||
                !isEqual(activePresetPayload.value.filters || {}, activeFilters.value)
            )
        }

        return true
    })

    const isFiltering = computed(() => {
        return !isEmpty(activeFilters.value) || searchQuery.value || activePreset.value
    })

    const hasActiveFilters = computed(() => activeFilterCount.value > 0)

    const searchPlaceholder = computed(() => {
        if (activePreset.value) {
            return 'Searching in:' + activePresetPayload.value.display
        }
        return 'Search'
    })

    keys.bind('f', (e) => {
        e.preventDefault()
        handleShowFilters && handleShowFilters()
    })

    const searchChanged = (query) => (searchQuery.value = query)

    const hasFields = (values) => {
        for (const fieldHandle in values) {
            if (values[fieldHandle]) return true
        }
        return false
    }

    const filterChanged = ({ handle, values }, unselectAll = true) => {
        if (values && hasFields(values)) {
            activeFilters.value = { ...activeFilters.value, [handle]: values }
        } else {
            delete activeFilters.value[handle]
        }
        if (unselectAll) unselectAllItems()
    }

    const filtersChanged = (filters) => {
        activeFilters.value = {}

        for (const handle in filters) {
            const values = filters[handle]
            filterChanged({ handle, values }, false)
        }

        unselectAllItems()
    }

    const filtersReset = () => {
        activePreset.value = null
        activePresetPayload.value = {}
        searchQuery.value = ''
        activeFilters.value = {}
        activeFilterBadges.value = {}
    }

    const unselectAllItems = () => {
        if (dataList.value) {
            dataList.value?.clearSelections()
        }
    }

    const selectPreset = (handle, preset) => {
        activePreset.value = handle
        activePresetPayload.value = preset
        searchQuery.value = preset.query

        filtersChanged(preset.filters)
    }

    const autoApplyFilters = (filters) => {
        if (!filters) return

        let values = {}

        filters
            .filter((filter) => !isEmpty(filter.auto_apply))
            .forEach((filter) => {
                values[filter.handle] = filter.auto_apply
            })

        activeFilters.value = values
    }

    return {
        activeFilterBadges,
        activePreset,
        activeFilters,
        activePresetPayload,
        searchQuery,
        activeFilterCount,
        canSave,
        isDirty,
        isFiltering,
        hasActiveFilters,
        searchPlaceholder,
        searchChanged,
        hasFields,
        filterChanged,
        unselectAllItems,
        filtersChanged,
        filtersReset,
        selectPreset,
        autoApplyFilters,
    }
}

export default hasFilters
