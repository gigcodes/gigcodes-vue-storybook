<script setup>
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { ref, useAttrs, useSlots } from 'vue'
import Input from '@/components/ui/Input/Input.vue'
import { offset, useFloating } from '@floating-ui/vue'
import CloseButton from '@/components/ui/CloseButton/CloseButton.vue'
import { CalendarIcon } from '@heroicons/vue/24/outline'

dayjs.extend(localizedFormat)

defineOptions({
    inheritAttrs: false,
})
const props = defineProps({
    form: {
        type: Object,
        default: () => ({}),
    },
    field: {
        type: Object,
        default: () => ({}),
    },
    inputLabel: String,
    inputtable: Boolean,
    inputtableBlurClose: {
        type: Boolean,
        default: true,
    },
    clearable: {
        type: Boolean,
        default: true,
    },
    dropDownOpened: Boolean,
    type: String,
    placement: {
        type: String,
        default: 'bottom-start',
    },
    placeholder: String,
})

const emit = defineEmits([
    'openDropdown',
    'closeDropdown',
    'update:dropDownOpened',
    'keyDown',
    'blur',
    'focus',
    'clear',
    'change',
])

const handleInputClick = () => (!props.inputtable ? toggleDropdown() : openDropdown())
const slots = useSlots()
const closeDropdown = () => {
    emit('update:dropDownOpened', false)
    emit('closeDropdown')
}

const toggleDropdown = () => {
    emit('update:dropDownOpened', !props.dropDownOpened)
    !props.dropDownOpened ? emit('openDropdown') : emit('closeDropdown')
}

const openDropdown = () => {
    emit('update:dropDownOpened', true)
    emit('closeDropdown')
}

const handleKeyDown = (event) => {
    emit('keyDown', event)
    if ((event.key === 'Space' || event.key === 'Enter') && !props.inputtable) {
        event.preventDefault()
        openDropdown()
    }
}

const handleInputBlur = (event) => {
    emit('blur', event)
    if (props.inputtable && props.inputtableBlurClose) {
        closeDropdown()
    }
}

const handleInputFocus = (event) => {
    emit('focus', event)
    if (props.inputtable) {
        openDropdown()
    }
}

const { class: className, ...rest } = useAttrs()
const reference = ref(null)
const floating = ref(null)
const middleware = ref([offset(10)])
const { floatingStyles } = useFloating(reference, floating, {
    placement: props.placement,
    middleware,
})

defineExpose({ focus: () => reference.value?.focus() })
</script>
<template>
    <Input
        ref="reference"
        v-bind="rest"
        :value="inputLabel"
        :form="form"
        :field="field"
        :class="className"
        :placeholder="placeholder"
        autocomplete="off"
        :type="type"
        @click="handleInputClick"
        @blur="handleInputBlur"
        @change="(e) => emit('change', e)"
        @focus="handleInputFocus"
        @keydown="handleKeyDown"
    >
        <template #suffix>
            <template v-if="clearable">
                <div @click="emit('clear')">
                    <slot v-if="slots.clearButton" name="clearButton" />
                    <CloseButton v-else class="text-base" />
                </div>
            </template>
            <template v-else>
                <slot v-if="slots.prefix" name="suffix" />
                <CalendarIcon v-else class="h-4" />
            </template>
        </template>
        <template #prefix>
            <slot name="prefix" />
        </template>
    </Input>
    <div ref="floating" class="picker" :style="floatingStyles">
        <div v-if="dropDownOpened" class="picker-panel">
            <slot />
        </div>
    </div>
</template>
