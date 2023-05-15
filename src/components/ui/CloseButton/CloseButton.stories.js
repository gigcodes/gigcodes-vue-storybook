import CloseButton from '.'

export default {
    title: 'UI/CloseButton',
    tags: ['autodocs'],
    component: CloseButton,
}

const Template = (args) => ({
    components: { CloseButton },
    setup() {
        return args
    },
    template: `<CloseButton v-bind="args">Button</CloseButton>`,
})

export const Default = Template.bind({})

Default.args = {}
