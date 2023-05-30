export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    asElement: {
        type: StringConstructor;
        default: string;
    };
    variant: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    asElement: {
        type: StringConstructor;
        default: string;
    };
    variant: {
        type: StringConstructor;
        default: string;
        validator(value: unknown): boolean;
    };
    height: (StringConstructor | NumberConstructor)[];
    width: (StringConstructor | NumberConstructor)[];
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    animation: boolean;
    variant: string;
    asElement: string;
}, {}>;
