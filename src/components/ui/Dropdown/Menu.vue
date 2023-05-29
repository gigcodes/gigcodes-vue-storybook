<script setup>
import PropTypes from 'vue-types'
import useUniqueId from '@/components/hooks/useUniqueId.js'
import useUncertainRef from '@/components/hooks/useUncertainRef.js'
import { computed, inject, provide, useAttrs } from 'vue'
import { useDropdownMenuContext } from '@/components/hooks/dropdownMenuContext.js'
import { Motion, Presence } from 'motion/vue'

const props = defineProps({
    classPrefix: PropTypes.string,
    activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hidden: Boolean,
    placement: PropTypes.string,
    menuClass: PropTypes.string,
})
const emits = defineEmits(['select', 'toggle'])

const menuRef = useUncertainRef()
const menuId = useUniqueId('menu-')
const upperMenuControl = inject('DropdownMenuContext', null)
const menuControl = useDropdownMenuContext(menuRef, upperMenuControl)

provide('DropdownMenuContext', menuControl)

const getTransform = (deg) => {
    let rotate = `rotateX(${deg}deg)`
    if (props.placement && props.placement.includes('center')) {
        return `${rotate} translateX(-50%)`
    }
    return rotate
}

const enterStyle = {
    opacity: 1,
    visibility: 'visible',
    transform: getTransform(0),
}
const exitStyle = {
    opacity: 0,
    visibility: 'hidden',
    transform: getTransform(40),
}
const initialStyle = computed(() => exitStyle)
const { ...restAttrs } = useAttrs()

provide('MenuContext', {
    activeKey: props.activeKey,
    select: (val) => emits('select', val),
})

const focus = () => {}
defineExpose({ focus })
</script>

<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <Presence>
        <Motion v-if="!hidden" :initial="initialStyle" :animate="enterStyle" :exit="exitStyle" class="box">
            <ul
                v-show="!hidden"
                :id="menuId"
                ref="menuRef"
                :class="menuClass"
                v-bind="restAttrs"
                @click.prevent="emits('toggle')"
            >
                <slot />
            </ul>
        </Motion>
    </Presence>
</template>
