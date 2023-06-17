<template>
    <div :class="cardClass" v-bind="restAttrs" @click="onClick">
        <div v-if="slots.header" :class="cardHeaderClass">
            <slot name="header" />
            <span v-if="slots.headerExtra"> <slot name="headerExtra" /></span>
        </div>
        <div :class="cardBodyClass"><slot /></div>
        <div v-if="slots.footer" :class="cardFooterClass"><slot name="footer" /></div>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { computed, inject, useAttrs, useSlots } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant'
import classNames from 'classnames'

const props = defineProps({
    bordered: Boolean,
    clickable: Boolean,
    bodyClass: String,
    headerClass: String,
    footerClass: String,
    headerBorder: {
        type: Boolean,
        default: true,
    },
    footerBorder: {
        type: Boolean,
        default: true,
    },
})
const emits = defineEmits(['onCardClick'])
const { cardBordered } = inject('config', DEFAULT_CONFIG)
const { class: className, ...restAttrs } = useAttrs()
const slots = useSlots()

const onClick = (e) => {
    emits('onCardClick', e)
}

const cardClass = computed(() =>
    classNames(
        'card',
        className,
        props.bordered ?? cardBordered ? `card-border` : `card-shadow`,
        props.clickable && 'cursor-pointer user-select-none'
    )
)
const cardBodyClass = computed(() => classNames('card-body', props.bodyClass))
const cardHeaderClass = computed(() =>
    classNames(
        'card-header',
        props.headerBorder && 'card-header-border',
        slots.headerExtra && 'card-header-extra',
        props.headerClass
    )
)
const cardFooterClass = computed(() =>
    classNames('card-footer', props.footerBorder && `card-footer-border`, props.footerClass)
)
</script>
