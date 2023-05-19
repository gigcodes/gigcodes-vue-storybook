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

const emits = defineEmits(['reset', 'selected'])

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
    presets.value = null //@todo this has to be updated from the state or needed to be linked with backed
}

const setPreset = (handle) => {
    getPresets()
    viewPreset(handle)
}

const refreshPresets = () => {
    getPresets()
    viewAll()
}

const viewAll = () => {
    emits('reset')
}

const viewPreset = (handle) => {
    emits('selected', handle, presets.value[handle])
}

const createPreset = () => {
    savingPresetName.value = null
    showCreateModal.value = true
}

const renamePreset = () => {
    savingPresetName.value = props.activePresetPayload.display
    showRenameModal.value = true
}

const savePreset = (handle) => {
    let presetHandle = handle || props.activePreset.display

    if (!presetHandle) {
        showCreateModal.value = true
        return
    }

    //@todo save action needed to be added
}

const deletePreset = () => {
    if (!showDeleteModal.value) {
        showDeleteModal.value = true
        return
    }

    //@todo delete action needed to be added
}

onBeforeMount(() => preferencesKey.value && getPresets())
</script>

<template>
    <div class="pt-2 pr-2">
        <div class="flex flex-wrap items-center"></div>
    </div>
</template>

<style scoped></style>
