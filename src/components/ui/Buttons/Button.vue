<template>
  <button ref="ref" v-bind="restAttrs" :disabled="disabled || loading" :class="classes">
    <span v-if="loading && slots.default" className="flex items-center justify-center">
      <Spinner :enable-theme="false" class="mr-1" />
      <slot />
    </span>
    <Spinner v-if="icon && !slots.default && loading" :enable-theme="false" />
    <slot v-if="!slots.default && !loading" name="icon" />
    <span
      v-if="slots.icon && slots.default && !loading"
      className="flex items-center justify-center"
    >
      <span className="text-lg">
        <slot name="icon" />
      </span>
      <span className="ltr:ml-1 rtl:mr-1"><slot /></span>
    </span>

    <slot v-if="!slots.icon && slots.default && !loading" />
  </button>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
<script setup>
import { inject, ref as reference, useAttrs, useSlots } from "vue";
import { DEFAULT_CONFIG, SIZES, CONTROL_SIZES } from "../utils/constant";
import Spinner from "../Spinner";
import useColorLevel from "../utils/useColorLevel";
import classNames from "classnames";

const ref = reference(null);

const { class: className, ...restAttrs } = useAttrs();
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

const { themeColor, controlSize, primaryColorLevel } = inject("config", DEFAULT_CONFIG);
const formControlSize = inject("form")?.size;
const inputGroupSize = inject("inputGroup")?.size;
const defaultClass = "button";
const sizeIconClass = "inline-flex items-center justify-center";

const splitedColor = props.color.split("-");

const buttonSize = props.size || inputGroupSize || formControlSize || controlSize;
const buttonColor = splitedColor[0] || themeColor;
const buttonColorLevel = splitedColor[1] || primaryColorLevel;

const [increaseLevel, decreaseLevel] = useColorLevel(buttonColorLevel);

const getButtonSize = () => {
  let sizeClass = "";
  switch (buttonSize) {
    case SIZES.LG:
      sizeClass = classNames(
        `h-${CONTROL_SIZES.lg}`,
        props.icon && !slots.default
          ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl`
          : "px-8 py-2 text-base"
      );
      break;
    case SIZES.SM:
      sizeClass = classNames(
        `h-${CONTROL_SIZES.sm}`,
        props.icon && !slots.default
          ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg`
          : "px-3 py-2 text-sm"
      );
      break;
    case SIZES.XS:
      sizeClass = classNames(
        `h-${CONTROL_SIZES.xs}`,
        props.icon && !slots.default
          ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base`
          : "px-3 py-1 text-xs"
      );
      break;
    default:
      sizeClass = classNames(
        `h-${CONTROL_SIZES.md}`,
        props.icon && !slots.default
          ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl`
          : "px-8 py-2"
      );
      break;
  }
  return sizeClass;
};

const disabledClass = "opacity-50 cursor-not-allowed";

const solidColor = () => {
  const btn = {
    bgColor: props.active
      ? `bg-${buttonColor}-${increaseLevel}`
      : `bg-${buttonColor}-${buttonColorLevel}`,
    textColor: "text-white",
    hoverColor: props.active ? "" : `hover:bg-${buttonColor}-${decreaseLevel}`,
    activeColor: `active:bg-${buttonColor}-${increaseLevel}`,
  };
  return getBtnColor(btn);
};

const twoToneColor = () => {
  const btn = {
    bgColor: props.active
      ? `bg-${buttonColor}-200 dark:bg-${buttonColor}-50`
      : `bg-${buttonColor}-50 dark:bg-${buttonColor}-500 dark:bg-opacity-20`,
    textColor: `text-${buttonColor}-${buttonColorLevel} dark:text-${buttonColor}-50`,
    hoverColor: props.active
      ? ""
      : `hover:bg-${buttonColor}-100 dark:hover:bg-${buttonColor}-500 dark:hover:bg-opacity-30`,
    activeColor: `active:bg-${buttonColor}-200 dark:active:bg-${buttonColor}-500 dark:active:bg-opacity-40`,
  };
  return getBtnColor(btn);
};

const defaultColor = () => {
  const btn = {
    bgColor: props.active
      ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500`
      : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
    textColor: `text-gray-600 dark:text-gray-100`,
    hoverColor: props.active ? "" : `hover:bg-gray-50 dark:hover:bg-gray-600`,
    activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
  };
  return getBtnColor(btn);
};

const plainColor = () => {
  const btn = {
    bgColor: props.active
      ? `bg-gray-100 dark:bg-gray-500`
      : "bg-transparent border border-transparent",
    textColor: `text-gray-600 dark:text-gray-100`,
    hoverColor: props.active ? "" : `hover:bg-gray-50 dark:hover:bg-gray-600`,
    activeColor: `active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500`,
  };
  return getBtnColor(btn);
};

const getBtnColor = ({ bgColor, hoverColor, activeColor, textColor }) => {
  return `${bgColor} ${
    props.disabled || props.loading ? disabledClass : hoverColor + " " + activeColor
  } ${textColor}`;
};

const btnColor = () => {
  switch (props.variant) {
    case "solid":
      return solidColor();
    case "twoTone":
      return twoToneColor();
    case "plain":
      return plainColor();
    case "default":
      return defaultColor();
    default:
      return defaultColor();
  }
};

const classes = classNames(
  defaultClass,
  btnColor(),
  `radius-${props.shape}`,
  getButtonSize(),
  className,
  props.block ? "w-full" : ""
);

defineExpose({ ref });
</script>
