<script setup>
import Item from '../MenuItem'
import { inject } from 'vue'

const props = defineProps({
    eventKey: String,
})

const menu = inject('menu')
const handleClick = () => {
    if (menu) {
        menu.emits(props.eventKey)
    }
}
</script>
<template>
    <Item :event-key="eventKey" @click="handleClick"><slot /></Item>
</template>
