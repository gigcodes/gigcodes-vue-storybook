import { DatePicker } from '.'

export default {
    title: 'UI/DatePicker',
    tags: ['autodocs'],
    component: DatePicker,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        placeholder: {
            control: 'text',
            defaultValue: 'placeholder',
            description: 'Placeholder for input',
            table: {
                category: 'Text',
            },
        },
        disabled: { control: 'boolean', defaultValue: false, description: 'To set the field is diabled or not' },
        inputtable: { control: 'boolean', defaultValue: false, description: 'Allow manually input the date' },
    },
}

const Template = (args) => ({
    components: { DatePicker },
    setup() {
        return args
    },
    template: `<DatePicker v-bind="args" />`,
})

export const Default = Template.bind({})

Default.args = {}
