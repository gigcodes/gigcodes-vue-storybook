export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    form: {
        type: ObjectConstructor;
        default: () => {};
    };
    field: {
        type: ObjectConstructor;
        default: () => {};
    };
    inputLabel: StringConstructor;
    inputtable: BooleanConstructor;
    inputtableBlurClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropdown: BooleanConstructor;
    type: StringConstructor;
    placement: {
        type: StringConstructor;
        default: string;
    };
    placeholder: StringConstructor;
    size: StringConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("clear" | "update:dropdown" | "keyDown" | "blur" | "focus" | "change")[], "clear" | "update:dropdown" | "keyDown" | "blur" | "focus" | "change", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    form: {
        type: ObjectConstructor;
        default: () => {};
    };
    field: {
        type: ObjectConstructor;
        default: () => {};
    };
    inputLabel: StringConstructor;
    inputtable: BooleanConstructor;
    inputtableBlurClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropdown: BooleanConstructor;
    type: StringConstructor;
    placement: {
        type: StringConstructor;
        default: string;
    };
    placeholder: StringConstructor;
    size: StringConstructor;
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onUpdate:dropdown"?: ((...args: any[]) => any) | undefined;
    onKeyDown?: ((...args: any[]) => any) | undefined;
}, {
    form: Record<string, any>;
    field: Record<string, any>;
    inputtable: boolean;
    inputtableBlurClose: boolean;
    clearable: boolean;
    dropdown: boolean;
    placement: string;
}, {}>;
