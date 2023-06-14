export default _sfc_main;
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<{
    month: DateConstructor;
    locale: StringConstructor;
    dateViewCount: NumberConstructor;
    paginateBy: NumberConstructor;
    renderDay: FunctionConstructor;
    daysRefs: ObjectConstructor;
    minDate: DateConstructor;
    maxDate: DateConstructor;
    enableHeaderLabel: BooleanConstructor;
    labelFormat: ObjectConstructor;
    weekdayLabelFormat: StringConstructor;
    preventFocus: BooleanConstructor;
    value: (DateConstructor | ArrayConstructor)[];
    range: ArrayConstructor;
    isDateInRange: FunctionConstructor;
    isDateFirstInRange: FunctionConstructor;
    isDateLastInRange: FunctionConstructor;
}, {}, any, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("monthChange" | "nextLevel" | "dayKeyDown")[], "monthChange" | "nextLevel" | "dayKeyDown", import('./vue/dist/vue.esm-bundler.js').VNodeProps & import('./vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('./vue/dist/vue.esm-bundler.js').ComponentCustomProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    month: DateConstructor;
    locale: StringConstructor;
    dateViewCount: NumberConstructor;
    paginateBy: NumberConstructor;
    renderDay: FunctionConstructor;
    daysRefs: ObjectConstructor;
    minDate: DateConstructor;
    maxDate: DateConstructor;
    enableHeaderLabel: BooleanConstructor;
    labelFormat: ObjectConstructor;
    weekdayLabelFormat: StringConstructor;
    preventFocus: BooleanConstructor;
    value: (DateConstructor | ArrayConstructor)[];
    range: ArrayConstructor;
    isDateInRange: FunctionConstructor;
    isDateFirstInRange: FunctionConstructor;
    isDateLastInRange: FunctionConstructor;
}>> & {
    onMonthChange?: ((...args: any[]) => any) | undefined;
    onNextLevel?: ((...args: any[]) => any) | undefined;
    onDayKeyDown?: ((...args: any[]) => any) | undefined;
}, {
    enableHeaderLabel: boolean;
    preventFocus: boolean;
}, {}>;
