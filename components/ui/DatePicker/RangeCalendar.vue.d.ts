export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    modelValue: {
        type: ArrayConstructor[];
        default: null;
    };
    dayStyle: ObjectConstructor;
    singleDate: BooleanConstructor;
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    paginateBy: BooleanConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "change" | "mouseLeave")[], "update:modelValue" | "change" | "mouseLeave", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor[];
        default: null;
    };
    dayStyle: ObjectConstructor;
    singleDate: BooleanConstructor;
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    paginateBy: BooleanConstructor;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onMouseLeave?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: unknown[];
    dateViewCount: number;
    paginateBy: boolean;
    singleDate: boolean;
}, {}>;
