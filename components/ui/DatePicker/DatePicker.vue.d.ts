export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    locale: StringConstructor;
    type: StringConstructor;
    size: StringConstructor;
    dayClassName: FunctionConstructor;
    inputFormat: StringConstructor;
    closePickerOnChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dateFormat: StringConstructor;
    defaultView: StringConstructor;
    labelFormat: {
        type: ObjectConstructor;
        default: () => {
            month: string;
            year: string;
        };
    };
    yearLabelFormat: StringConstructor;
    defaultOpen: BooleanConstructor;
    disabled: BooleanConstructor;
    inputtable: BooleanConstructor;
    openPickerOnClear: BooleanConstructor;
    disableOutOfMonth: BooleanConstructor;
    enableHeaderLabel: BooleanConstructor;
    hideOutOfMonthDates: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    disableDate: FunctionConstructor;
    defaultMonth: DateConstructor;
    weekendDays: (StringConstructor | DateConstructor | ArrayConstructor)[];
    renderDay: FunctionConstructor;
    maxDate: DateConstructor;
    minDate: DateConstructor;
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    dayStyle: FunctionConstructor;
    modelValue: (StringConstructor | DateConstructor | ArrayConstructor)[];
    defaultValue: (StringConstructor | DateConstructor | ArrayConstructor)[];
    dateViewCount: NumberConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "blur" | "focus" | "dropdownClose" | "dropdownOpen")[], "update:modelValue" | "blur" | "focus" | "dropdownClose" | "dropdownOpen", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    locale: StringConstructor;
    type: StringConstructor;
    size: StringConstructor;
    dayClassName: FunctionConstructor;
    inputFormat: StringConstructor;
    closePickerOnChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dateFormat: StringConstructor;
    defaultView: StringConstructor;
    labelFormat: {
        type: ObjectConstructor;
        default: () => {
            month: string;
            year: string;
        };
    };
    yearLabelFormat: StringConstructor;
    defaultOpen: BooleanConstructor;
    disabled: BooleanConstructor;
    inputtable: BooleanConstructor;
    openPickerOnClear: BooleanConstructor;
    disableOutOfMonth: BooleanConstructor;
    enableHeaderLabel: BooleanConstructor;
    hideOutOfMonthDates: BooleanConstructor;
    hideWeekdays: BooleanConstructor;
    disableDate: FunctionConstructor;
    defaultMonth: DateConstructor;
    weekendDays: (StringConstructor | DateConstructor | ArrayConstructor)[];
    renderDay: FunctionConstructor;
    maxDate: DateConstructor;
    minDate: DateConstructor;
    firstDayOfWeek: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    dayStyle: FunctionConstructor;
    modelValue: (StringConstructor | DateConstructor | ArrayConstructor)[];
    defaultValue: (StringConstructor | DateConstructor | ArrayConstructor)[];
    dateViewCount: NumberConstructor;
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onDropdownClose?: ((...args: any[]) => any) | undefined;
    onDropdownOpen?: ((...args: any[]) => any) | undefined;
}, {
    name: string;
    disabled: boolean;
    inputtable: boolean;
    clearable: boolean;
    labelFormat: Record<string, any>;
    firstDayOfWeek: string;
    enableHeaderLabel: boolean;
    disableOutOfMonth: boolean;
    hideWeekdays: boolean;
    hideOutOfMonthDates: boolean;
    closePickerOnChange: boolean;
    defaultOpen: boolean;
    openPickerOnClear: boolean;
}, {}>;
