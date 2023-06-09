import { Segment } from '.'

export default {
    title: 'UI/Segment',
    tags: ['autodocs'],
    component: Segment,
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
    components: { Segment },
    setup() {
        return args
    },
    template: `
    <Segment v-bind="args"></Segment>`,
})

export const Default = Template.bind({})
Default.args = {}
