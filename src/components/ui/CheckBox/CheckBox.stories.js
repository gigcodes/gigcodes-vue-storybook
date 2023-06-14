import { CheckBox } from '.'

export default {
    title: 'UI/CheckBox',
    tags: ['autodocs'],
    component: CheckBox,
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
    components: { CheckBox },
    setup() {
        return args
    },
    template: `<CheckBox v-bind="args" />`,
})

export const Default = Template.bind({})

Default.args = {}
