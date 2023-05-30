export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    type: {
        type: StringConstructor;
        validator(value: unknown): boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    triggerByToast: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, "onClose"[], "onClose", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    type: {
        type: StringConstructor;
        validator(value: unknown): boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    triggerByToast: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onOnClose?: ((...args: any[]) => any) | undefined;
}, {
    duration: number;
    triggerByToast: boolean;
    closable: boolean;
    showIcon: boolean;
    title: string;
}, {}>;
