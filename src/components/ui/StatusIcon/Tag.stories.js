import StatusIcon from '.'

export default {
    title: 'UI/StatusIcon',
    tags: ['autodocs'],
    component: StatusIcon,
}

const Template = (args) => ({
    components: { StatusIcon },
    setup() {
        return args
    },
    template: `<StatusIcon v-bind="args">Tag</StatusIcon>`,
})

export const Default = Template.bind({})

Default.args = {}
