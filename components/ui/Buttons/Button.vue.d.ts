export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    shape: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    size: {
        type: StringConstructor;
        validator(value: unknown): boolean;
    };
    variant: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    shape: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    size: {
        type: StringConstructor;
        validator(value: unknown): boolean;
    };
    variant: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    color: string;
    disabled: boolean;
    loading: boolean;
    block: boolean;
    active: boolean;
    shape: string;
    variant: string;
}, {}>;
