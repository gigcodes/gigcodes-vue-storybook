export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    message: {
        type: StringConstructor;
        required: true;
    };
    isOpen: BooleanConstructor;
    placement: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    message: {
        type: StringConstructor;
        required: true;
    };
    isOpen: BooleanConstructor;
    placement: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
}>>, {
    isOpen: boolean;
    placement: string;
}, {}>;
