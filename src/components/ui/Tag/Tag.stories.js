import Tag from '.'

export default {
    title: 'UI/Tag',
    tags: ['autodocs'],
    component: Tag,
}

const Template = (args) => ({
    components: { Tag },
    setup() {
        return args
    },
    template: `<Tag v-bind="args">Tag</Tag>`,
})

export const Default = Template.bind({})

Default.args = {}
