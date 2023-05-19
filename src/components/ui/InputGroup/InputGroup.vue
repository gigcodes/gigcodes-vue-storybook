<script setup>
import { DEFAULT_CONFIG, SIZES } from '@/components/ui/utils/constant.js'
import { inject, provide, useAttrs } from 'vue'
import classNames from 'classnames'

const props = defineProps({
    size: {
        type: String,
        validator(value) {
            return [SIZES.LG, SIZES.SM, SIZES.MD].includes(value)
        },
    },
})

const { controlSize } = inject('config', DEFAULT_CONFIG)
const formControlSize = inject('form')?.size
const inputGroupSize = props.size || formControlSize || controlSize
const { class: className, ...restAttrs } = useAttrs()

const inputGroupClass = classNames('input-group', className)

provide('inputGroup', { size: inputGroupSize })
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>

<template>
    <div :class="inputGroupClass" v-bind="restAttrs"><slot /></div>
</template>
