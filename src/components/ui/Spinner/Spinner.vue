<template>
  <component
    :is="indicator"
    ref="ref"
    :class="spinnerClass"
    :style="spinnerStyle"
    v-bind="attrs"
  />
</template>
<script setup>
import { useAttrs, ref as reference } from "vue";
import { DEFAULT_CONFIG } from "../utils/constant";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

const ref = reference(null);

const props = defineProps({
  size: {
    type: [String, Number],
    default: 20,
  },
  color: String,
  isSpining: {
    type: Boolean,
    default: true,
  },
  enableTheme: {
    type: Boolean,
    default: true,
  },
  indicator: {
    type: Function,
    default: ArrowPathIcon,
  },
});

const attrs = useAttrs();

const { themeColor, primaryColorLevel } = DEFAULT_CONFIG;

const spinnerColor =
  props.color || (props.enableTheme && `${themeColor}-${primaryColorLevel}`);

const spinnerStyle = {
  height: props.size,
  width: props.size,
};

const spinnerClass = classNames(
  props.isSpining && "animate-spin",
  spinnerColor && `text-${spinnerColor}`
);

defineExpose([ref]);
</script>
