export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    invalid: BooleanConstructor;
    showSeconds: BooleanConstructor;
    clearable: BooleanConstructor;
    format: {
        type: StringConstructor;
        default: string;
    };
    timeFieldPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    amPmPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    seperator: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    size: StringConstructor;
    id: StringConstructor;
    modelValue: {
        type: ArrayConstructor;
        default: () => null[];
    };
    name: StringConstructor;
    amLabel: StringConstructor;
    pmLabel: StringConstructor;
    field: StringConstructor;
    form: StringConstructor;
    timeFieldClass: StringConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    invalid: BooleanConstructor;
    showSeconds: BooleanConstructor;
    clearable: BooleanConstructor;
    format: {
        type: StringConstructor;
        default: string;
    };
    timeFieldPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    amPmPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    seperator: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    size: StringConstructor;
    id: StringConstructor;
    modelValue: {
        type: ArrayConstructor;
        default: () => null[];
    };
    name: StringConstructor;
    amLabel: StringConstructor;
    pmLabel: StringConstructor;
    field: StringConstructor;
    form: StringConstructor;
    timeFieldClass: StringConstructor;
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    modelValue: unknown[];
    clearable: boolean;
    invalid: boolean;
    seperator: string;
    amPmPlaceholder: string;
    format: string;
    showSeconds: boolean;
    timeFieldPlaceholder: string;
}, {}>;
