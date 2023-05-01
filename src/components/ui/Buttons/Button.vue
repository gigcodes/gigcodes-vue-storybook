<template>
  <button ref="ref" v-bind="attrs">
    <span v-if="loading && slots.default" className="flex items-center justify-center">
      <Spinner :enable-theme="false" class="mr-1" />
      <slot />
    </span>
    <Spinner v-if="icon && !slots.default && loading" :enable-theme="false" />
    <component
      v-if="icon && typeof icon != 'string' && !slots.default && !loading"
      :is="icon"
    />
    <template v-if="icon && typeof icon == 'string' && !slots.default && !loading">
      {{ icon }}
    </template>
    <span
      v-if="icon && slots.default && !loading"
      className="flex items-center justify-center"
    >
      <span className="text-lg">
        <component v-if="typeof icon != 'string'" :is="icon" />
        <template v-else>{{ icon }}</template>
      </span>
      <span className="ltr:ml-1 rtl:mr-1"><slot /></span>
    </span>

    <slot v-if="!icon && slots.default && !loading" />
  </button>
</template>

<script setup>
import { ref as reference, useAttrs, useSlots } from "vue";
import { SIZES } from "../utils/constant";
import Spinner from "../Spinner";

const ref = reference(null);

const attrs = useAttrs();
const slots = useSlots();

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: [Object, String],
  block: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  shape: {
    type: String,
    default: "round",
    validator(value) {
      return ["round", "circle", "none"].includes(value);
    },
  },
  size: {
    type: String,
    validator(value) {
      return [SIZES.LG, SIZES.SM, SIZES.XS, SIZES.MD].includes(value);
    },
  },
  variant: {
    type: String,
    default: "default",
    validator(value) {
      return ["solid", "twoTone", "plain", "default"].includes(value);
    },
  },
  color: {
    type: String,
    default: "",
  },
});

const defaultClass = "button";
const sizeIconClass = "inline-flex items-center justify-center";

defineExpose({ ref });
</script>
