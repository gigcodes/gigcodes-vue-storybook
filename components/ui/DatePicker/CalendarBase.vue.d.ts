export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    defaultView: {
        type: StringConstructor;
        default: string;
    };
    locale: StringConstructor;
    dayClassName: FunctionConstructor;
    defaultMonth: DateConstructor;
    month: DateConstructor;
    labelFormat: ObjectConstructor;
    monthLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    weekdayLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    yearLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    enableHeaderLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableDate: FunctionConstructor;
    disableOutOfMonth: BooleanConstructor;
    preventFocus: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    hideOutOfMonthDates: BooleanConstructor;
    renderDay: FunctionConstructor;
    minDate: DateConstructor;
    maxDate: DateConstructor;
    value: (DateConstructor | ArrayConstructor)[];
    dayStyle: FunctionConstructor;
    paginateBy: {
        type: NumberConstructor;
        default: number;
    };
    range: ArrayConstructor;
    weekendDays: (StringConstructor | DateConstructor | ArrayConstructor)[];
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("change" | "monthChange" | "dayMouseEnter")[], "change" | "monthChange" | "dayMouseEnter", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    defaultView: {
        type: StringConstructor;
        default: string;
    };
    locale: StringConstructor;
    dayClassName: FunctionConstructor;
    defaultMonth: DateConstructor;
    month: DateConstructor;
    labelFormat: ObjectConstructor;
    monthLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    weekdayLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    yearLabelFormat: {
        type: StringConstructor;
        default: string;
    };
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    enableHeaderLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableDate: FunctionConstructor;
    disableOutOfMonth: BooleanConstructor;
    preventFocus: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    hideOutOfMonthDates: BooleanConstructor;
    renderDay: FunctionConstructor;
    minDate: DateConstructor;
    maxDate: DateConstructor;
    value: (DateConstructor | ArrayConstructor)[];
    dayStyle: FunctionConstructor;
    paginateBy: {
        type: NumberConstructor;
        default: number;
    };
    range: ArrayConstructor;
    weekendDays: (StringConstructor | DateConstructor | ArrayConstructor)[];
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onMonthChange?: ((...args: any[]) => any) | undefined;
    onDayMouseEnter?: ((...args: any[]) => any) | undefined;
}, {
    defaultView: string;
    monthLabelFormat: string;
    weekdayLabelFormat: string;
    yearLabelFormat: string;
    firstDayOfWeek: string;
    dateViewCount: number;
    enableHeaderLabel: boolean;
    disableOutOfMonth: boolean;
    preventFocus: boolean;
    hideWeekdays: boolean;
    hideOutOfMonthDates: boolean;
    paginateBy: number;
}, {}>;
