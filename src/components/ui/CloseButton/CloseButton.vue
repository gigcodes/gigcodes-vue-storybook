<template>
  <span :class="closeButtonClass" ref="ref" v-bind="restAttrs" role="button">
    <XMarkIcon class="h-4" />
  </span>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import classNames from "classnames";
import { useAttrs, ref as reference } from "vue";

const { class: className, ...restAttrs } = useAttrs();

const { defaultStyle, absolute } = defineProps({
  defaultStyle: {
    type: Boolean,
    default: true,
  },
  absolute: {
    type: Boolean,
    default: false,
  },
});

const ref = reference(null);

const closeButtonAbsoluteClass = "absolute z-10";

const closeButtonClass = classNames(
  "close-btn",
  defaultStyle && "close-btn-default",
  absolute && closeButtonAbsoluteClass,
  className
);

defineExpose({ ref });
</script>
