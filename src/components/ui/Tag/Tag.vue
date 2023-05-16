<template>
    <div v-bind="rest" :class="classNames('gc-tag', className)">
        <slot name="prefix" :class="classNames('gc-tag-affix gc-tag-prefix', prefixClass)" />
        <slot />
        <slot name="suffix" :class="classNames('gc-tag-affix gc-tag-suffix', suffixClass)" />
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import classNames from 'classnames'
import { useAttrs } from 'vue'

defineProps({
    prefixClass: String,
    suffixClass: String,
})

const { class: className, ...rest } = useAttrs()
</script>
