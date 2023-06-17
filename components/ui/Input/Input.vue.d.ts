export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    asElement: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        validator(value: unknown): boolean;
    };
    invalid: BooleanConstructor;
    placeholder: StringConstructor;
    modelValue: (StringConstructor | NumberConstructor | DateConstructor)[];
    value: (StringConstructor | NumberConstructor | DateConstructor)[];
    unstyle: BooleanConstructor;
    disabled: BooleanConstructor;
    form: ObjectConstructor;
    field: ObjectConstructor;
    focus: BooleanConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("click" | "update:modelValue" | "blur" | "focus" | "change" | "input" | "keydown" | "keyup")[], "click" | "update:modelValue" | "blur" | "focus" | "change" | "input" | "keydown" | "keyup", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    asElement: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        validator(value: unknown): boolean;
    };
    invalid: BooleanConstructor;
    placeholder: StringConstructor;
    modelValue: (StringConstructor | NumberConstructor | DateConstructor)[];
    value: (StringConstructor | NumberConstructor | DateConstructor)[];
    unstyle: BooleanConstructor;
    disabled: BooleanConstructor;
    form: ObjectConstructor;
    field: ObjectConstructor;
    focus: BooleanConstructor;
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onKeyup?: ((...args: any[]) => any) | undefined;
    onClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    disabled: boolean;
    focus: boolean;
    asElement: string;
    invalid: boolean;
    unstyle: boolean;
}, {}>;
