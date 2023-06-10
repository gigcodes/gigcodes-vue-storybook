<template>
    <div class="picker-header flex items-center justify-between mb-2" v-bind="$attrs">
        <template v-if="!renderCenter">
            <slot v-if="slots.default"></slot>
            <button
                v-else
                class="picker-header-label"
                :disabled="nextLevelDisabled"
                :tabIndex="preventLevelFocus ? -1 : 0"
                type="button"
                @click="(e) => emit('nextLevel', e)"
                @mousedown="(e) => preventFocus && e.preventDefault()"
            >
                {{ label }}
            </button>
        </template>
        <div :class="classNames(renderCenter && 'justify-between w-full', 'flex items-center rtl:flex-row-reverse')">
            <Button
                type="button"
                variant="plain"
                :class="classNames(!hasPrevious && renderCenter && 'opacity-0 cursor-default')"
                size="sm"
                :disabled="!hasPrevious"
                :aria-label="previousLabel"
                @click="(e) => emit('previous', e)"
                @mousedown="(event) => preventFocus && event.preventDefault()"
            >
                <template #icon>
                    <ChevronLeftIcon class="h-4" />
                </template>
            </Button>
            <template v-if="renderCenter">
                <slot v-if="slots.default"></slot>
                <button
                    v-else
                    class="picker-header-label"
                    :disabled="nextLevelDisabled"
                    :tabIndex="preventLevelFocus ? -1 : 0"
                    type="button"
                    @click="(e) => emit('nextLevel', e)"
                    @mousedown="(e) => preventFocus && e.preventDefault()"
                >
                    {{ label }}
                </button>
            </template>
            <Button
                type="button"
                variant="plain"
                :class="classNames(!hasNext && renderCenter && 'opacity-0 cursor-default')"
                size="sm"
                :disabled="!hasNext"
                :aria-label="nextLabel"
                @click="(e) => emit('next', e)"
                @mousedown="(event) => preventFocus && event.preventDefault()"
            >
                <template #icon>
                    <ChevronRightIcon class="h-4" />
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup>
import Button from '../../Buttons'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { useSlots } from 'vue'
import classNames from 'classnames'

defineProps({
    hasNext: Boolean,
    hasPrevious: Boolean,
    onNext: Function,
    onPrevious: Function,
    onNextLevel: Function,
    className: String,
    label: String,
    nextLevelDisabled: Boolean,
    style: Object,
    nextLabel: String,
    previousLabel: String,
    preventLevelFocus: {
        type: Boolean,
        default: false,
    },
    renderCenter: {
        type: Boolean,
        default: false,
    },
    preventFocus: Boolean,
})

const emit = defineEmits(['next', 'previous', 'nextLevel'])
const slots = useSlots()
</script>
