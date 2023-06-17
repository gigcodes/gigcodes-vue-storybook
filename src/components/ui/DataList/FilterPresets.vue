<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { clone } from 'lodash'
import slugify from '../../hooks/slugify.js'
import Button from '../Buttons/Button.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import { DropdownItem } from '../Dropdown'
import { PlusIcon } from '@heroicons/vue/24/solid'
import Tooltip from '../Tooltip'
import ConfirmationModal from '../ConfirmationModal'
import Input from '../Input'
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

const refreshPreset = () => {
    if (props.activePreset) {
        setPreset(props.activePreset)
    } else {
        viewAll()
    }
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
    let presetHandle = handle || props.activePreset

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

defineExpose({ savePreset, refreshPresets, refreshPreset })
</script>

<template>
    <div class="pt-2 pr-2">
        <div class="flex flex-wrap items-center">
            <Button :class="{ active: !activePreset }" size="sm" @click="viewAll">All</Button>
            <template v-for="(preset, handle) in presets" :key="handle">
                <Dropdown v-if="handle === activePreset" placement="bottom-left">
                    <template #renderTitle>
                        <Button :class="{ active: !activePreset }" size="sm">{{ preset.display }}</Button>
                    </template>
                    <DropdownItem event-key="Duplicate" @click="createPreset" />
                    <DropdownItem event-key="Rename" @click="renamePreset" />
                    <DropdownItem variant="divider" />
                    <DropdownItem event-key="Delete" @click="deletePreset" />
                </Dropdown>
                <Button :class="{ active: !activePreset }" class="mr-1" size="sm" @click="viewPreset(handle)">
                    {{ preset.display }}
                </Button>
            </template>

            <Tooltip message="Create new view" class="ml-2">
                <Button size="sm" @click="createPreset"><PlusIcon class="h-4" /> </Button>
            </Tooltip>
        </div>
    </div>

    <ConfirmationModal
        v-if="showCreateModal"
        title="Create new view"
        button-text="Create"
        @cancel="showCreateModal = false"
        @confirm="savePreset(savingPresetSlug)"
    >
        <Input v-model="savingPresetName" focus @keydown.enter="savePreset(savingPresetSlug)" />
    </ConfirmationModal>

    <ConfirmationModal
        v-if="showRenameModal"
        title="Rename view"
        button-text="Rename"
        @cancel="showRenameModal = false"
        @confirm="savePreset"
    >
        <Input v-model="savingPresetName" focus @keydown.enter="savePreset()" />
    </ConfirmationModal>
    <ConfirmationModal
        v-if="showDeleteModal"
        title="Delete view"
        button-text="Delete"
        body-text="Are you sure you want to delete this view ?"
        danger
        @cancel="showDeleteModal = false"
        @confirm="deletePreset"
    >
        <Input v-model="savingPresetName" focus @keydown.enter="savePreset()" />
    </ConfirmationModal>
</template>

<style scoped></style>
