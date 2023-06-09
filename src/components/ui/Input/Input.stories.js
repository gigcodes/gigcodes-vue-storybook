import Input from '.'

export default {
    title: 'UI/Input',
    tags: ['autodocs'],
    component: Input,
    argTypes: {
        placeholder: {
            control: 'text',
            defaultValue: 'placeholder',
            description: 'Placeholder for input',
            table: {
                category: 'Text',
            },
        },
        size: {
            control: {
                type: 'select',
            },
            defaultValue: 'md',
            options: ['lg', 'md', 'sm'],
            table: {
                category: 'Sizes',
            },
        },
        invalid: { control: 'boolean', defaultValue: false, description: 'To set the field invalid or not' },
        disabled: { control: 'boolean', defaultValue: false, description: 'To set the field is diabled ot not' },
        unstyle: { control: 'boolean', defaultValue: false },
        type: {
            control: {
                type: 'select',
            },
            defaultValue: 'text',
            options: [
                'textarea',
                'button',
                'checkbox',
                'color',
                'date',
                'datetime-local',
                'email',
                'file',
                'hidden',
                'image',
                'month',
                'password',
                'radio',
                'range',
                'reset',
                'search',
                'submit',
                'text',
                'time',
                'url',
                'week',
            ],
            table: {
                category: 'Text',
            },
        },
        onBlur: {
            control: false,
            description: 'This event is triggered on blur',
            table: {
                category: 'Events',
                type: {
                    summary: null,
                },
            },
        },
        onChange: {
            control: false,
            description: 'This event is triggered on change',
            table: {
                category: 'Events',
                type: {
                    summary: null,
                },
            },
        },
        onFocus: {
            control: false,
            description: 'This event is triggered on focus',
            table: {
                category: 'Events',
                type: {
                    summary: null,
                },
            },
        },
    },
}

const Template = (args) => ({
    components: { Input },
    setup() {
        return args
    },
    template: `
    <Input v-bind="args"></Input>`,
})

export const Default = Template.bind({})
Default.args = {}
