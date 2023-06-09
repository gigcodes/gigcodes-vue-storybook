import Spinner from '.'

export default {
    title: 'UI/Spinner',
    tags: ['autodocs'],
    component: Spinner,
    argTypes: {
        size: {
            control: 'text',
            defaultValue: 20,
            description: 'Size of Spinner',
        },
        enableTheme: {
            control: 'boolean',
            defaultValue: false,
            description: 'Whether the Spinner inherit theme color',
        },
        isSpinning: {
            control: 'boolean',
            defaultValue: true,
            description: 'Whether the Spinner is spinning',
        },
        indicator: {
            control: false,
            description: 'Spinner component type',
        },
        color: {
            control: 'text',
            description: 'Tailwind color class',
        },
    },
}

const Template = (args) => ({
    components: { Spinner },
    setup() {
        return args
    },
    template: `
    <Spinner v-bind="args">Button</Spinner>`,
})

export const Default = Template.bind({})

Default.args = {}
