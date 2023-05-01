<template>
    <div v-bind="rest" :class="classNames('tag', className)">
        <slot name="prefix" :class="classNames('tag-affix tag-prefix', prefixClass)" />
        <slot />
        <slot name="suffix" :class="classNames('tag-affix tag-suffix', suffixClass)" />
    </div>
</template>

<script setup>
import classNames from 'classnames'
import { useAttrs } from 'vue'

defineProps({
    prefixClass: String,
    suffixClass: String,
})

const { class: className, ...rest } = useAttrs()
</script>
