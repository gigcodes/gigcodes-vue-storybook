<template>
    <label for="checkerOfAllBoxes" class="flex items-center justify-center relative cursor-pointer">
        <input
            id="checkerOfAllBoxes"
            type="checkbox"
            :checked="anyItemsChecked"
            class="relative top-0"
            @change="toggle"
        />
    </label>
</template>

<script setup>
import { chain } from 'lodash'
import { computed, inject } from 'vue'
const sharedState = inject('sharedState')

const anyItemsChecked = computed(() => {
    return sharedState.value.selections.length > 0
})

const toggle = () => {
    anyItemsChecked.value ? uncheckAllItems() : checkMaximumAmountOfItems()
}

const checkMaximumAmountOfItems = () => {
    sharedState.value.selections = chain(sharedState.value.rows)
        .map((item) => item.id)
        .first(sharedState.value.maxSelections ?? Infinity)
        .value()
}

const uncheckAllItems = () => {
    sharedState.value.selections = []
}
</script>
