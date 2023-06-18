<template>
    <div>
        <Tooltip message="Customize Columns">
            <Button class="flex items-center justify-center" size="sm" @click="open = true">
                <AdjustmentsHorizontalIcon class="h-4" />
            </Button>
        </Tooltip>
        <Dialog :is-open="open" class="column-picker" @close="open = false">
            <h3 class="mb-4 h4">Customize Columns</h3>
            <div class="flex grow min-h-0 rounded-t-md bg-gray-100">
                <!-- Available Columns -->
                <div class="outline-none text-left w-1/2 border flex flex-col">
                    <header class="py-2 px-3 text-sm bg-white font-medium" v-text="'Available Columns'" />
                    <div
                        v-if="hiddenColumns.length"
                        class="flex flex-1 flex-col space-y-1 py-2 px-3 select-none shadow-inner overflow-y-scroll"
                    >
                        <div v-for="column in hiddenColumns" :key="column.field" class="column-picker-item">
                            <label class="flex items-center cursor-pointer">
                                <input
                                    v-model="column.visible"
                                    type="checkbox"
                                    class="mr-2"
                                    @change="columnToggled(column)"
                                />
                                {{ column.label }}
                            </label>
                        </div>
                    </div>
                </div>
                <!-- Displayed Columns -->
                <div class="w-1/2 flex flex-col">
                    <header
                        class="border px-3 py-2 text-sm bg-white font-medium flex-none"
                        v-text="'Displayed Columns'"
                    />
                    <div class="grow overflow-y-scroll shadow-inner">
                        <div class="space-y-1 py-1 px-3 select-none">
                            <draggable v-model="selectedColumns" item-key="id" @start="drag = true" @end="drag = false">
                                <template #item="{ element }">
                                    <div class="item sortable cursor-grab" tabindex="-1">
                                        <div class="item-move py-1">&nbsp;</div>
                                        <div class="flex flex-1 ml-2 items-center p-0">
                                            <input
                                                v-model="element.visible"
                                                type="checkbox"
                                                class="mr-2"
                                                :disabled="selectedColumns.length === 1"
                                                @change="columnToggled(element)"
                                            />
                                            {{ element.label }}
                                        </div>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="preferencesKey" class="pt-4 border-t flex items-center justify-end">
                <Button class-name="ltr:mr-2 rtl:ml-2" variant="plain" :disabled="saving" @click="reset">
                    Reset
                </Button>
                <Button variant="solid" :color="color" @click="save"> Save </Button>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
import { inject, onMounted, ref, watch } from 'vue'
import Button from '../Buttons'
import Dialog from '../Dialog'
import Tooltip from '../Tooltip'
import { findIndex, sortBy } from 'lodash'
import draggable from 'vuedraggable'

const open = ref(false)
const drag = ref(false)
const saving = ref(false)
const selectedColumns = ref([])
const hiddenColumns = ref([])
const sharedState = inject('sharedState')

defineProps({
    preferencesKey: String,
})

const setLocalColumns = () => {
    selectedColumns.value = sharedState.value.columns.filter((column) => column.visible)
    let hiddenCol = sharedState.value.columns.filter((column) => !column.visible)
    hiddenColumns.value = sortBy(hiddenCol, (column) => column.label.toLowerCase())
}

const setSharedStateColumns = () => {
    sharedState.value.columns = [...selectedColumns.value, ...hiddenColumns.value]
}

const columnToggled = (column) => {
    let fromArray = column.visible ? hiddenColumns.value : selectedColumns.value
    let toArray = column.visible ? selectedColumns.value : hiddenColumns.value
    let currentIndex = findIndex(fromArray, { field: column.field })

    toArray.push(fromArray[currentIndex])
    fromArray.splice(currentIndex, 1)

    hiddenColumns.value = sortBy(hiddenColumns.value, (column) => column.label.toLowerCase())
}

const reset = () => {
    sharedState.value.columns.forEach((column) => (column.visible = column.defaultVisibility))
    sharedState.value.columns = sortBy(sharedState.value.columns, (column) => column.defaultOrder)
    setLocalColumns()

    saving.value = true
}
const save = () => {
    saving.value = true
}

watch(selectedColumns, () => setSharedStateColumns(), { deep: true })

onMounted(() => {
    setLocalColumns()
})
</script>
<style>
.column-picker .dialog-content {
    padding: 1rem;
}
</style>
