<template>
    <div v-bind="rest" :class="classNames('gc-tag', className)">
        <template v-for="(item, index) in defaultPrefixTags" :key="index">
            <component :is="item"></component>
        </template>
        <slot />
        <template v-for="(item, index) in defaultSuffixTags" :key="index">
            <component :is="item"></component>
        </template>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
}
</script>
<script setup>
import classNames from 'classnames'
import { h, useAttrs, useSlots } from 'vue'

const props = defineProps({
    prefixClass: String,
    suffixClass: String,
})
const slots = useSlots()

const defaultPrefixTags =
    slots.prefix &&
    slots.prefix()?.map((item) => {
        return h(
            item.type,
            {
                ...item.props,
                class: classNames('gc-tag-affix gc-tag-prefix', props.prefixClass),
            },
            item.children
        )
    })
const defaultSuffixTags =
    slots.suffix &&
    slots.suffix()?.map((item) => {
        return h(
            item.type,
            {
                ...item.props,
                class: classNames('gc-tag-affix gc-tag-suffix', props.suffixClass),
            },
            item.children
        )
    })
const { class: className, ...rest } = useAttrs()
</script>
