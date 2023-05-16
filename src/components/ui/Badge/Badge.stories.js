import Badge from '.'

export default {
    title: 'UI/Badge',
    tags: ['autodocs'],
    component: Badge,
}

const Template = (args) => ({
    components: { Badge },
    setup() {
        return args
    },
    template: `<Badge v-bind="args"></Badge>`,
})

export const Default = Template.bind({})

Default.args = {
    class: 'mr-4 font-semibold',
    content: '99',
    'inner-class': 'bg-red-50 text-red-500',
}
