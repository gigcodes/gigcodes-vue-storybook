<script setup>
import { inject, useAttrs } from 'vue'
import classNames from 'classnames'

const { class: className, ...restAttrs } = useAttrs()
const { variant } = inject('tabs', {})
</script>
<script>
export default {
    inheritAttrs: false,
}
</script>
<template>
    <div role="tablist" :class="classNames('tab-list', `tab-list-${variant}`, className)" v-bind="restAttrs">
        <slot />
    </div>
</template>
