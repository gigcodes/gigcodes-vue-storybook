<script setup>
import PropTypes from 'vue-types'
import { PLACEMENT } from '../utils/constant'
import { useDropdownMenuContext } from '@/components/hooks/dropdownMenuContext.js'
import { ref, useSlots } from 'vue'
import useUniqueId from '@/components/hooks/useUniqueId.js'
import arrayIndexOf from '@/components/ui/utils/arrayIndexOf.js'
import chainedFunction from '@/components/ui/utils/chainedFunction.js'
import useRootClose from '@/components/hooks/useRootClose.js'
import DropdownMenu from '@/components/ui/Dropdown/DropdownMenu.vue'
import DropdownToggle from '@/components/ui/Dropdown/DropdownToggle.vue'

const CLICK = 'click'
const HOVER = 'hover'
const CONTEXT = 'context'
const props = defineProps({
    trigger: PropTypes.oneOf(['click', 'hover', 'context']).def('click'),
    placement: PropTypes.oneOf([
        PLACEMENT.TOP_START,
        PLACEMENT.TOP_CENTER,
        PLACEMENT.TOP_END,
        PLACEMENT.BOTTOM_START,
        PLACEMENT.BOTTOM_CENTER,
        PLACEMENT.BOTTOM_END,
        PLACEMENT.MIDDLE_START_TOP,
        PLACEMENT.MIDDLE_START_BOTTOM,
        PLACEMENT.MIDDLE_END_TOP,
        PLACEMENT.MIDDLE_END_BOTTOM,
    ]).def(PLACEMENT.BOTTOM_START),
    menuClass: PropTypes.string,
    menuStyle: PropTypes.object,
    disabled: Boolean,
    title: PropTypes.string,
    activeKey: PropTypes.string,
    toggleClassName: PropTypes.string,
})

const overlayTarget = ref()
const triggerTarget = ref()
const menuControl = useDropdownMenuContext(overlayTarget)
const open = menuControl.open

const buttonId = useUniqueId('dropdown-toggle-')
const menuId = useUniqueId('base-menu-')
const emits = defineEmits([
    'toggle',
    'open',
    'close',
    'select',
    'contextMenu',
    'onClick',
    'onMouseEnter',
    'onMouseLeave',
])

const handleToggle = (isOpen) => {
    const nextOpen = typeof isOpen === 'undefined' ? !open.value : isOpen
    const fn = nextOpen ? () => emits('open') : () => emits('close')

    fn?.()
    emits('toggle', nextOpen)
    if (nextOpen) {
        menuControl.openMenu()
    } else {
        menuControl.closeMenu()
    }
}

const handleClick = (e) => {
    e.preventDefault()
    if (props.disabled) {
        return
    }
    handleToggle()
}

const handleMouseEnter = () => {
    if (!props.disabled) {
        handleToggle(true)
    }
}

const handleMouseLeave = () => {
    if (!props.disabled) {
        handleToggle(false)
    }
}

const handleSelect = (eventKey) => {
    emits('select', eventKey)
    handleToggle(false)
}

useRootClose(() => handleToggle(), {
    triggerTarget,
    overlayTarget,
    disabled: !open.value,
    listenEscape: false,
})

const dropdownProps = {
    mouseEnter: handleMouseEnter,
    mouseLeave: handleMouseLeave,
}

const emitOnContextMenu = (val) => emits('contextMenu', val)

const toggleEventHandlers = {
    click: (value) => emits('onClick', value),
    contextMenu: emitOnContextMenu,
}

if (arrayIndexOf(CLICK, props.trigger)) {
    toggleEventHandlers.click = chainedFunction(handleClick, toggleEventHandlers.click)
}

if (arrayIndexOf(CONTEXT, props.trigger)) {
    toggleEventHandlers.contextMenu = chainedFunction(handleClick, emitOnContextMenu)
}

if (arrayIndexOf(HOVER, props.trigger)) {
    dropdownProps.mouseEnter = chainedFunction(handleMouseEnter, (val) => emits('onMouseEnter', val))
    dropdownProps.mouseLeave = chainedFunction(handleMouseLeave, (val) => emits('onMouseLeave', val))
}

const slots = useSlots()
</script>

<template>
    <div ref="dropdown" class="dropdown" v-on="dropdownProps">
        <DropdownToggle
            :id="buttonId"
            ref="triggerTarget"
            :class="toggleClassName"
            :disabled="disabled"
            :placement="placement"
            v-on="toggleEventHandlers"
        >
            <template v-if="slots.renderTitle" #renderTitle>
                <slot name="renderTitle" />
            </template>
            {{ title }}
        </DropdownToggle>
        <DropdownMenu
            :id="menuId"
            ref="overlayTarget"
            :class="menuClass"
            :style="menuStyle"
            :active-key="activeKey"
            :hidden="!open"
            :placement="placement"
            @select="handleSelect"
        >
            <slot />
        </DropdownMenu>
    </div>
</template>
