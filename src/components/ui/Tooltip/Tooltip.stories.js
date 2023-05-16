import Tooltip from '.'

export default {
    title: 'UI/Tooltip',
    tags: ['autodocs'],
    component: Tooltip,
}

const Template = (args) => ({
    components: { Tooltip },
    setup() {
        return args
    },
    template: `<Tooltip v-bind="args"><button>Test</button></Tooltip>`,
})

export const Default = Template.bind({})

Default.args = {
    message: 'tooltip',
}
