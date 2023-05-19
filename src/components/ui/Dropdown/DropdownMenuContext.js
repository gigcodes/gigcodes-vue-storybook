import { computed, nextTick, reactive, ref } from 'vue'

export function useDropdownMenuContext(menuRef) {
    const open = ref(false)
    const items = reactive([])
    const activeItemIndex = ref(null)
    const previousActiveElementRef = ref(null)

    function registerItem(element, props) {
        items.push({ element, props })
    }

    function unregisterItem(id) {
        const index = items.findIndex((item) => item.element.id === id)
        if (index !== -1) {
            items.splice(index, 1)
        }
    }

    function focusSelf() {
        nextTick(() => {
            if (document.activeElement !== menuRef.value) {
                previousActiveElementRef.value = document.activeElement
                menuRef.value?.focus()
            }
        })
    }

    function focusItem(item) {
        const itemIndex = items.indexOf(item)
        if (itemIndex !== -1) {
            activeItemIndex.value = itemIndex
            focusSelf()
        }
    }

    function lookupNextActiveItemIndex(start, direction) {
        for (let i = start; i > -1 && i < items.length; i += direction) {
            if (!items[i].props?.disabled) {
                return i
            }
        }
        return null
    }

    function focusItemAt(index) {
        if (index == null) {
            activeItemIndex.value = null
            focusSelf()
        } else {
            let activeItemIndexValue
            if (index === 0) {
                activeItemIndexValue = lookupNextActiveItemIndex(0, 1)
            } else if (index === -1) {
                activeItemIndexValue = lookupNextActiveItemIndex(items.length - 1, -1)
            }

            if (activeItemIndexValue != null) {
                focusItem(items[activeItemIndexValue])
            }
        }
    }

    function openMenu() {
        open.value = true
        focusSelf()
    }

    function closeMenu() {
        open.value = false
        activeItemIndex.value = null
        nextTick(() => {
            previousActiveElementRef.value?.focus()
        })
    }

    return {
        open: computed(() => open.value),
        items: computed(() => items),
        activeItemIndex: computed(() => activeItemIndex.value),
        registerItem,
        unregisterItem,
        focusItemAt,
        openMenu,
        closeMenu,
    }
}
