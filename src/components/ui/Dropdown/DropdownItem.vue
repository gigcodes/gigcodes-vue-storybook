<script setup>
import PropTypes from 'vue-types'
import { DEFAULT_CONFIG, DROPDOWN_ITEM_TYPE } from '../utils/constant'
import { cloneVNode, computed, inject, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'
import useUniqueId from '@/components/hooks/useUniqueId.js'
import { isNil } from 'lodash'
import classNames from 'classnames'
import { useDropdownMenuContext } from '@/components/hooks/dropdownMenuContext.js'
import MenuItem from '../MenuItem'
import chainedFunction from '@/components/ui/utils/chainedFunction.js'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    active: Boolean,
    disabled: Boolean,
    variant: PropTypes.oneOf([
        DROPDOWN_ITEM_TYPE.DEFAULT,
        DROPDOWN_ITEM_TYPE.DIVIDER,
        DROPDOWN_ITEM_TYPE.HEADER,
        DROPDOWN_ITEM_TYPE.CUSTOM,
    ]).def(DROPDOWN_ITEM_TYPE.DEFAULT),
    eventKey: PropTypes.string,
    submenu: PropTypes.object,
    asElement: PropTypes.string.def('li'),
})
const emits = defineEmits(['select', 'click'])
const submenuRef = ref(null)
const { mode, direction } = inject('config', DEFAULT_CONFIG)

const menuitemRef = ref(null)
const menuitemId = `menu-item-${useUniqueId()}`

const dropdown = inject('DropdownContext', null)
const menu = inject('MenuContext', null)
const menuControl = inject('DropdownMenuContext', null)
const submenuControl = useDropdownMenuContext(submenuRef)
const open = submenuControl.open
const hasSubmenu = computed(() => Object.keys(props.submenu).length)
const active = computed(() => {
    const menuActiveKey = menu?.activeKey
    const dropdownActiveKey = dropdown?.activeKey
    return (
        props.active ||
        (!isNil(menuActiveKey) && menuActiveKey === props.eventKey) ||
        (!isNil(dropdownActiveKey) && dropdownActiveKey === props.eventKey)
    )
})

const openSubmenuIfExists = () => {
    if (!hasSubmenu.value) {
        return
    }
    submenuControl.openMenu()
    submenuControl.focusItemAt(0)
}

const activate = (e) => {
    emits('select', props.eventKey, e)
    menu?.select?.(props.eventKey, e)
}

const handleClick = () => {
    if (props.disabled) {
        return
    }

    if (hasSubmenu.value) {
        openSubmenuIfExists()
    } else {
        activate(props.eventKey)
    }
}

const handleMouseOver = () => {
    if (hasSubmenu.value) {
        submenuControl.openMenu()
    }
}

const handleMouseOut = () => {
    if (hasSubmenu.value) {
        submenuControl.closeMenu()
    }
}

const emitOnClick = () => emits('click', props.eventKey)

const menuitemEventHandlers = {
    click: chainedFunction(handleClick, emitOnClick),
}

if (hasSubmenu.value) {
    menuitemEventHandlers.mouseover = handleMouseOver
    menuitemEventHandlers.mouseout = handleMouseOut
}

const registerItem = menuControl ? menuControl.registerItem : null
const unregisterItem = menuControl ? menuControl.unregisterItem : null

onBeforeUnmount(() => {
    unregisterItem?.(menuitemId)
})

onMounted(() => {
    if (props.variant !== 'DIVIDER' && props.variant !== 'HEADER' && props.variant !== 'CUSTOM') {
        registerItem?.(menuitemRef.value, { disabled: props.disabled })
    }
})
const { class: className, style, ...restAttrs } = useAttrs()

const { DIVIDER, HEADER, CUSTOM } = DROPDOWN_ITEM_TYPE

const renderSubmenu = () => {
    if (!hasSubmenu.value) return null
    return cloneVNode(props.submenu, {
        ref: submenuRef,
        hidden: !open.value,
    })
}
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <component
        :is="asElement"
        v-if="variant === DIVIDER || variant === HEADER || variant === CUSTOM"
        :id="menuitemId"
        ref="menuitemRef"
        :style="style"
        :class="classNames(`menu-item-${variant}`, className)"
        v-bind="restAttrs"
        v-on="variant === CUSTOM ? menuitemEventHandlers : {}"
    >
        <slot v-bind="variant === HEADER || variant === CUSTOM" />
    </component>
    <li v-if="hasSubmenu" v-bind="restAttrs" :style="style" class="relative" v-on="menuitemEventHandlers">
        <MenuItem
            :id="menuitemId"
            ref="menuitemRef"
            as-element="div"
            :is-active="active"
            :variant="mode"
            :class="classNames('dropdown-submenu-item', className)"
        >
            <span><slot /></span>
            <ChevronLeftIcon v-if="direction === 'rtl'" class="h-3" />
            <ChevronRightIcon v-else class="h-3" />
            <component :is="renderSubmenu" :hidden="!open" />
        </MenuItem>
    </li>
    <MenuItem
        v-else
        ref="menuitemRef"
        as-element="li"
        :style="style"
        :is-active="active"
        :disabled="disabled"
        :class="className"
        :variant="mode"
        v-bind="restAttrs"
        v-on="menuitemEventHandlers"
    >
        <slot />
        <component :is="renderSubmenu" v-if="hasSubmenu" />
    </MenuItem>
</template>
