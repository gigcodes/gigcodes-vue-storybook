import Spinner from '.'

export default {
    title: 'UI/Spinner',
    tags: ['autodocs'],
    component: Spinner,
}

const Template = (args) => ({
    components: { Spinner },
    setup() {
        return args
    },
    template: `<Spinner v-bind="args">Button</Spinner>`,
})

export const Default = Template.bind({})

Default.args = {}
