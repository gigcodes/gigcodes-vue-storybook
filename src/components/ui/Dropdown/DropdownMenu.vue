<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { computed, h, inject, ref, useAttrs, useSlots } from 'vue'
import PropTypes from 'vue-types'
import classNames from 'classnames'
import Menu from './Menu.vue'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem.vue'

const { class: className, ...restAttrs } = useAttrs()
const props = defineProps({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    eventKey: PropTypes.string,
    placement: PropTypes.string,
    hidden: Boolean,
})

const emits = defineEmits(['toggle'])

const parentMenu = inject('MenuContext', null)

const handleToggleSubmenu = () => {
    emits('toggle', props.eventKey)
}

const dropdownMenuDefaultClass = `dropdown-menu`

const dropdownMenuClass = computed(() => classNames(dropdownMenuDefaultClass, props.placement, className))

const dropdownSubmenuClass = computed(() => classNames(dropdownMenuDefaultClass, 'dropdown-submenu'))
const slots = useSlots()
const dropdownSubmenu = h(
    Menu,
    {
        class: dropdownSubmenuClass.value,
        onToggle: handleToggleSubmenu,
        onSelect: parentMenu?.select,
        placement: props.placement,
        ...restAttrs,
    },
    slots
)
const baseRef = ref()
const focus = () => {}

defineExpose({ focus })
</script>

<template>
    <DropdownItem v-if="parentMenu" ref="baseRef" :class="className" :submenu="dropdownSubmenu" :event-key="eventKey">
        {{ title }}
    </DropdownItem>
    <Menu v-else ref="baseRef" :class="dropdownMenuClass" :placement="placement" :hidden="hidden" v-bind="restAttrs">
        <component :is="slot" v-for="(slot, key) in slots" :key="key" />
    </Menu>
</template>
