export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    value: ObjectConstructor;
    onChange: FunctionConstructor;
    locale: StringConstructor;
    year: NumberConstructor;
    onYearChange: FunctionConstructor;
    onNextLevel: FunctionConstructor;
    minDate: DateConstructor;
    maxDate: DateConstructor;
    preventFocus: BooleanConstructor;
    monthLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    yearLabelFormat: {
        type: StringConstructor;
        default: string;
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("change" | "yearChange" | "nextLevel")[], "change" | "yearChange" | "nextLevel", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    value: ObjectConstructor;
    onChange: FunctionConstructor;
    locale: StringConstructor;
    year: NumberConstructor;
    onYearChange: FunctionConstructor;
    onNextLevel: FunctionConstructor;
    minDate: DateConstructor;
    maxDate: DateConstructor;
    preventFocus: BooleanConstructor;
    monthLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    yearLabelFormat: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onYearChange?: ((...args: any[]) => any) | undefined;
    onNextLevel?: ((...args: any[]) => any) | undefined;
}, {
    monthLabelFormat: string;
    yearLabelFormat: string;
    preventFocus: boolean;
}, {}>;
