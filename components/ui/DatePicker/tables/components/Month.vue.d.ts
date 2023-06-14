export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    locale: StringConstructor;
    month: DateConstructor;
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    weekdayLabelFormat: StringConstructor;
    maxDate: DateConstructor[];
    minDate: DateConstructor[];
    value: (StringConstructor | NumberConstructor | DateConstructor | ArrayConstructor)[];
    disableDate: FunctionConstructor;
    disableOutOfMonth: BooleanConstructor;
    dayClassName: FunctionConstructor;
    dayStyle: FunctionConstructor;
    styles: {
        type: ObjectConstructor;
        default: () => void;
    };
    renderDay: FunctionConstructor;
    fullWidth: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    hideOutOfMonthDates: BooleanConstructor;
    focusable: {
        type: BooleanConstructor;
        default: boolean;
    };
    preventFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    range: ArrayConstructor;
    weekendDays: {
        type: ArrayConstructor;
        default: () => number[];
    };
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("change" | "keydown" | "dayMouseEnter")[], "change" | "keydown" | "dayMouseEnter", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    locale: StringConstructor;
    month: DateConstructor;
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    weekdayLabelFormat: StringConstructor;
    maxDate: DateConstructor[];
    minDate: DateConstructor[];
    value: (StringConstructor | NumberConstructor | DateConstructor | ArrayConstructor)[];
    disableDate: FunctionConstructor;
    disableOutOfMonth: BooleanConstructor;
    dayClassName: FunctionConstructor;
    dayStyle: FunctionConstructor;
    styles: {
        type: ObjectConstructor;
        default: () => void;
    };
    renderDay: FunctionConstructor;
    fullWidth: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    hideOutOfMonthDates: BooleanConstructor;
    focusable: {
        type: BooleanConstructor;
        default: boolean;
    };
    preventFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    range: ArrayConstructor;
    weekendDays: {
        type: ArrayConstructor;
        default: () => number[];
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onDayMouseEnter?: ((...args: any[]) => any) | undefined;
}, {
    size: string;
    firstDayOfWeek: string;
    disableOutOfMonth: boolean;
    preventFocus: boolean;
    hideWeekdays: boolean;
    hideOutOfMonthDates: boolean;
    weekendDays: unknown[];
    styles: Record<string, any>;
    fullWidth: boolean;
    focusable: boolean;
}, {}>;
