<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { clone } from 'lodash'
import slugify from '../../hooks/slugify.js'

const props = defineProps({
    activeFilters: Object,
    activePreset: String,
    activePresetPayload: Object,
    hasActiveFilters: Boolean,
    preferencesPrefix: String,
    searchQuery: String,
})

const presets = ref([])
const showCreateModal = ref(false)
const showRenameModal = ref(false)
const showDeleteModal = ref(false)
const savingPresetName = ref(null)

const preferencesKey = computed(() => (props.preferencesPrefix ? `${props.preferencesPrefix}.filters` : null))
const presetPreferencesPayload = computed(() => {
    let payload = {
        display: savingPresetName.value || props.activePresetPayload.display,
    }

    if (props.searchQuery) payload.query = props.searchQuery
    if (props.hasActiveFilters) payload.filters = clone(props.activeFilters)

    return payload
})

const savingPresetSlug = computed(() => slugify(savingPresetName.value, '-'))

const getPresets = () => {
    presets.value = ''
}

onBeforeMount(() => preferencesKey.value && getPresets())
</script>

<template></template>

<style scoped></style>
