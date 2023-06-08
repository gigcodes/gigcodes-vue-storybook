import Input from '.'

export default {
    title: 'UI/Input',
    tags: ['autodocs'],
    component: Input,
}

const Template = (args) => ({
    components: { Input },
    setup() {
        return args
    },
    template: `
    <Input v-bind="args"></Input>`,
})

export const Default = Template.bind({})

Default.args = {}
