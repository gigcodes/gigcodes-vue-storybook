<script setup>
import { ACTION, PLACEMENT } from '@/components/ui/utils/constant.js'
import { ref } from 'vue'
import { useDropdownMenuContext } from '@/components/ui/Dropdown/DropdownMenuContext.js'
import useUniqueId from '@/components/hooks/useUniqueId.js'

const props = defineProps({
    trigger: {
        type: String,
        default: ACTION.CLICK,
        validator(value) {
            return [...ACTION].includes(value)
        },
    },
    placement: {
        type: String,
        default: PLACEMENT.BOTTOM_START,
        validator(value) {
            return [...PLACEMENT].includes(value)
        },
    },
    menuClass: String,
    menuStyle: Object,
    disabled: Boolean,
    title: String,
    renderTitle: String,
    activeKey: String,
    toggleClassName: String,
    onOpen: Function,
    onClose: Function,
})

const overlayTarget = ref(null)
const triggerTarget = ref(null)

const menuControl = useDropdownMenuContext(overlayTarget)

const open = menuControl.open

const buttonId = useUniqueId('dropdown-toggle-')
const menuId = useUniqueId('base-menu-')

const handleToggle = (isOpen) => {
    const nextOpen = typeof isOpen === 'undefined' ? !open.value : isOpen
    const fn = nextOpen ? onOpen : onClose

    fn?.()
    onToggle?.(nextOpen)
    if (nextOpen) {
        menuControl.openMenu()
    } else {
        menuControl.closeMenu()
    }
}
</script>

<template></template>

<style scoped></style>
