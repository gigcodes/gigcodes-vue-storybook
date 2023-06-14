export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    value: NumberConstructor;
    minYear: NumberConstructor;
    maxYear: NumberConstructor;
    preventFocus: BooleanConstructor;
    yearLabelFormat: {
        type: StringConstructor;
        default: string;
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, "change"[], "change", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    value: NumberConstructor;
    minYear: NumberConstructor;
    maxYear: NumberConstructor;
    preventFocus: BooleanConstructor;
    yearLabelFormat: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    yearLabelFormat: string;
    preventFocus: boolean;
}, {}>;
