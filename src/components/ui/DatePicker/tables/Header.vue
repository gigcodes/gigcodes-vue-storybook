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
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 20 20"
                        class="h-4"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
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
                    <svg
                        class="h-4"
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup>
import Button from '../../Buttons'
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
