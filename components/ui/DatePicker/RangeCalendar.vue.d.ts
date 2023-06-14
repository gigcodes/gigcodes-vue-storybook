export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    value: (DateConstructor | ArrayConstructor)[];
    dayStyle: ObjectConstructor;
    singleDate: BooleanConstructor;
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    paginateBy: BooleanConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("change" | "mouseLeave")[], "change" | "mouseLeave", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    value: (DateConstructor | ArrayConstructor)[];
    dayStyle: ObjectConstructor;
    singleDate: BooleanConstructor;
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    paginateBy: BooleanConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onMouseLeave?: ((...args: any[]) => any) | undefined;
}, {
    dateViewCount: number;
    paginateBy: boolean;
    singleDate: boolean;
}, {}>;
