<template>
    <span ref="ref" :class="closeButtonClass" v-bind="restAttrs" role="button">
        <XMarkIcon class="h-4" />
    </span>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import classNames from 'classnames'
import { ref as reference, useAttrs } from 'vue'

const { class: className, ...restAttrs } = useAttrs()

const props = defineProps({
    defaultStyle: {
        type: Boolean,
        default: true,
    },
    absolute: {
        type: Boolean,
        default: false,
    },
})

const ref = reference(null)

const closeButtonAbsoluteClass = 'absolute z-10'

const closeButtonClass = classNames(
    'close-btn',
    props.defaultStyle && 'close-btn-default',
    props.absolute && closeButtonAbsoluteClass,
    className
)

defineExpose({ ref })
</script>
