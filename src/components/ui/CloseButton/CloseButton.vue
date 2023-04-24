<template>
    <span :class="closeButtonClass" v-bind="attrs" role="button">
        <XMarkIcon style="height: 1em;width: 1em" />
    </span>
</template>

<script setup>
import {XMarkIcon} from "@heroicons/vue/24/solid"
import classNames from 'classnames'
import {useAttrs} from "vue"

const attrs = useAttrs()

const {defaultStyle, absolute} = defineProps({
    defaultStyle: {
        default: true,
    }
})

const closeButtonAbsoluteClass = 'absolute z-10'

const closeButtonClass = classNames(
    'close-btn',
    defaultStyle && 'close-btn-default',
    absolute && closeButtonAbsoluteClass,
)


</script>