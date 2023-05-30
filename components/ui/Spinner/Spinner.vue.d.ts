export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    color: StringConstructor;
    isSpinning: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableTheme: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicator: {
        type: FunctionConstructor;
        default: import('./vue/dist/vue.esm-bundler.js').FunctionalComponent<import('./vue/dist/vue.esm-bundler.js').HTMLAttributes & import('./vue/dist/vue.esm-bundler.js').VNodeProps, {}, any>;
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    color: StringConstructor;
    isSpinning: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableTheme: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicator: {
        type: FunctionConstructor;
        default: import('./vue/dist/vue.esm-bundler.js').FunctionalComponent<import('./vue/dist/vue.esm-bundler.js').HTMLAttributes & import('./vue/dist/vue.esm-bundler.js').VNodeProps, {}, any>;
    };
}>>, {
    size: string | number;
    isSpinning: boolean;
    enableTheme: boolean;
    indicator: Function;
}, {}>;
