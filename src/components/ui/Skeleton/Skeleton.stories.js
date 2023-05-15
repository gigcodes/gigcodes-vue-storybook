import Skeleton from '.'

export default {
    title: 'UI/Skeleton',
    tags: ['autodocs'],
    component: Skeleton,
}

const Template = (args) => ({
    components: { Skeleton },
    setup() {
        return args
    },
    template: `<Skeleton v-bind="args">Button</Skeleton>`,
})

export const Default = Template.bind({})

Default.args = {}
