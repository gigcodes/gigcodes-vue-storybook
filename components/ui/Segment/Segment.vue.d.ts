export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    modelValue: (StringConstructor | ArrayConstructor)[];
    selectionType: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    size: StringConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: (StringConstructor | ArrayConstructor)[];
    selectionType: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    size: StringConstructor;
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    selectionType: string;
}, {}>;
