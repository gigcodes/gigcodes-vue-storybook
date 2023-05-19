<script setup>
import { CONTROL_SIZES, DEFAULT_CONFIG, SIZES } from '@/components/ui/utils/constant.js'
import { inject, useAttrs } from 'vue'
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
const inputGroupSize = inject('inputGroup')?.size

const inputAddonSize = props.size || inputGroupSize || formControlSize || controlSize

const { class: className, ...restAttrs } = useAttrs()

const addonClass = classNames(
    'input-addon',
    `input-addon-${inputAddonSize} h-${CONTROL_SIZES[inputAddonSize]}`,
    className
)
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>

<template>
    <div :class="addonClass" v-bind="restAttrs"><slot /></div>
</template>

<style scoped></style>
