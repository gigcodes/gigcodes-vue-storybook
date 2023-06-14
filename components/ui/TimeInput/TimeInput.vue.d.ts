export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    amLabel: {
        type: StringConstructor;
        default: string;
    };
    amPmPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: BooleanConstructor;
    format: {
        type: StringConstructor;
        default: string;
    };
    field: ObjectConstructor;
    form: ObjectConstructor;
    id: StringConstructor;
    invalid: BooleanConstructor;
    name: StringConstructor;
    nextRef: ObjectConstructor;
    onChange: FunctionConstructor;
    pmLabel: {
        type: StringConstructor;
        default: string;
    };
    prefix: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSeconds: BooleanConstructor;
    size: StringConstructor;
    suffix: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeFieldPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    timeFieldClass: StringConstructor;
    modelValue: (StringConstructor | DateConstructor)[];
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    amLabel: {
        type: StringConstructor;
        default: string;
    };
    amPmPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: BooleanConstructor;
    format: {
        type: StringConstructor;
        default: string;
    };
    field: ObjectConstructor;
    form: ObjectConstructor;
    id: StringConstructor;
    invalid: BooleanConstructor;
    name: StringConstructor;
    nextRef: ObjectConstructor;
    onChange: FunctionConstructor;
    pmLabel: {
        type: StringConstructor;
        default: string;
    };
    prefix: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSeconds: BooleanConstructor;
    size: StringConstructor;
    suffix: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeFieldPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    timeFieldClass: StringConstructor;
    modelValue: (StringConstructor | DateConstructor)[];
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    clearable: boolean;
    invalid: boolean;
    amLabel: string;
    amPmPlaceholder: string;
    format: string;
    pmLabel: string;
    prefix: boolean;
    showSeconds: boolean;
    suffix: boolean;
    timeFieldPlaceholder: string;
}, {}>;
