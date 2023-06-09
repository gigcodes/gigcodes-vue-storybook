import Switcher from '.'

export default {
    title: 'UI/Switcher',
    tags: ['autodocs'],
    component: Switcher,
    argTypes: {
        value: { control: 'boolean', defaultValue: false, description: 'To set the field checked or not' },
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
    components: { Switcher },
    setup() {
        return args
    },
    template: `
    <Switcher v-bind="args"></Switcher>`,
})

export const Default = Template.bind({})
Default.args = {}
