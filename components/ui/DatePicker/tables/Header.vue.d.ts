export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    hasNext: BooleanConstructor;
    hasPrevious: BooleanConstructor;
    onNext: FunctionConstructor;
    onPrevious: FunctionConstructor;
    onNextLevel: FunctionConstructor;
    className: StringConstructor;
    label: StringConstructor;
    nextLevelDisabled: BooleanConstructor;
    style: ObjectConstructor;
    nextLabel: StringConstructor;
    previousLabel: StringConstructor;
    preventLevelFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    preventFocus: BooleanConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("nextLevel" | "next" | "previous")[], "nextLevel" | "next" | "previous", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    hasNext: BooleanConstructor;
    hasPrevious: BooleanConstructor;
    onNext: FunctionConstructor;
    onPrevious: FunctionConstructor;
    onNextLevel: FunctionConstructor;
    className: StringConstructor;
    label: StringConstructor;
    nextLevelDisabled: BooleanConstructor;
    style: ObjectConstructor;
    nextLabel: StringConstructor;
    previousLabel: StringConstructor;
    preventLevelFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    preventFocus: BooleanConstructor;
}>> & {
    onNextLevel?: ((...args: any[]) => any) | undefined;
    onNext?: ((...args: any[]) => any) | undefined;
    onPrevious?: ((...args: any[]) => any) | undefined;
}, {
    preventFocus: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    nextLevelDisabled: boolean;
    preventLevelFocus: boolean;
    renderCenter: boolean;
}, {}>;
