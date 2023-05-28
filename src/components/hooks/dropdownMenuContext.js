import { computed, onBeforeUnmount, ref } from 'vue'
import { isNil } from 'lodash'

export function useDropdownMenuContext(menuRef) {
    const open = ref(false)
    const items = ref([])
    const activeItemIndex = ref(null)
    const previousActiveElementRef = ref(null)

    const registerItem = (element, props) => {
        items.value.push({ element, props })
    }

    const unregisterItem = (id) => {
        items.value = items.value.filter((item) => item.element.id !== id)
    }

    const focusSelf = () => {
        requestAnimationFrame(() => {
            if (document.activeElement !== menuRef.value) {
                previousActiveElementRef.value = document.activeElement
                menuRef.value?.focus()
            }
        })
    }

    const focusItem = (item) => {
        const itemIndex = items.value.indexOf(item)
        if (itemIndex !== -1) {
            activeItemIndex.value = itemIndex
            focusSelf()
        }
    }

    const lookupNextActiveItemIndex = (start, direction) => {
        for (let i = start; i > -1 && i < items.value.length; i += direction) {
            if (!items.value[i].props?.disabled) {
                return i
            }
        }
        return null
    }

    const focusItemAt = (index) => {
        if (isNil(index)) {
            activeItemIndex.value = null
            focusSelf()
        } else {
            let activeItemIndexValue
            if (index === 0) {
                activeItemIndexValue = lookupNextActiveItemIndex(0, 1)
            } else if (index === -1) {
                activeItemIndexValue = lookupNextActiveItemIndex(items.value.length - 1, -1)
            }

            if (!isNil(activeItemIndexValue)) {
                focusItem(items.value[activeItemIndexValue])
            }
        }
    }

    const openMenu = () => {
        open.value = true
        focusSelf()
    }

    const closeMenu = () => {
        open.value = false
        activeItemIndex.value = null
        requestAnimationFrame(() => {
            previousActiveElementRef.value?.focus()
        })
    }

    // Cleanup when the component is unmounted
    onBeforeUnmount(() => {
        items.value = []
    })

    return {
        open: computed(() => open.value),
        items: computed(() => items.value),
        activeItemIndex: computed(() => activeItemIndex.value),
        registerItem,
        unregisterItem,
        focusItemAt,
        openMenu,
        closeMenu,
    }
}
