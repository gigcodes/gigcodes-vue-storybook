export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closePickerOnChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    dayClassName: FunctionConstructor;
    dayStyle: StringConstructor;
    defaultMonth: DateConstructor;
    defaultOpen: BooleanConstructor;
    defaultValue: ArrayConstructor;
    defaultView: StringConstructor;
    disabled: BooleanConstructor;
    disableDate: FunctionConstructor;
    enableHeaderLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableOutOfMonth: BooleanConstructor;
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    hideOutOfMonthDates: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    inputFormat: StringConstructor;
    labelFormat: {
        type: ObjectConstructor;
        default: () => {
            month: string;
            year: string;
        };
    };
    seperator: {
        type: StringConstructor;
        default: string;
    };
    locale: StringConstructor;
    maxDate: DateConstructor;
    minDate: DateConstructor;
    openPickerOnClear: BooleanConstructor;
    renderDay: FunctionConstructor;
    singleDate: BooleanConstructor;
    size: StringConstructor;
    weekendDays: ArrayConstructor;
    yearLabelFormat: ObjectConstructor;
    modelValue: (StringConstructor | DateConstructor | ArrayConstructor)[];
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closePickerOnChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    dateViewCount: {
        type: NumberConstructor;
        default: number;
    };
    dayClassName: FunctionConstructor;
    dayStyle: StringConstructor;
    defaultMonth: DateConstructor;
    defaultOpen: BooleanConstructor;
    defaultValue: ArrayConstructor;
    defaultView: StringConstructor;
    disabled: BooleanConstructor;
    disableDate: FunctionConstructor;
    enableHeaderLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableOutOfMonth: BooleanConstructor;
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    hideOutOfMonthDates: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    inputFormat: StringConstructor;
    labelFormat: {
        type: ObjectConstructor;
        default: () => {
            month: string;
            year: string;
        };
    };
    seperator: {
        type: StringConstructor;
        default: string;
    };
    locale: StringConstructor;
    maxDate: DateConstructor;
    minDate: DateConstructor;
    openPickerOnClear: BooleanConstructor;
    renderDay: FunctionConstructor;
    singleDate: BooleanConstructor;
    size: StringConstructor;
    weekendDays: ArrayConstructor;
    yearLabelFormat: ObjectConstructor;
    modelValue: (StringConstructor | DateConstructor | ArrayConstructor)[];
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    clearable: boolean;
    labelFormat: Record<string, any>;
    firstDayOfWeek: string;
    dateViewCount: number;
    enableHeaderLabel: boolean;
    disableOutOfMonth: boolean;
    hideWeekdays: boolean;
    hideOutOfMonthDates: boolean;
    closePickerOnChange: boolean;
    defaultOpen: boolean;
    openPickerOnClear: boolean;
    seperator: string;
    singleDate: boolean;
}, {}>;
