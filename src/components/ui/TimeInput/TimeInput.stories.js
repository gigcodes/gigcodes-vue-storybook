import { TimeInput } from '.'

export default {
    title: 'UI/TimeInput',
    tags: ['autodocs'],
    component: TimeInput,
    argTypes: {
        disabled: { control: 'boolean', defaultValue: false, description: 'To set the field is diabled or not' },
    },
}

const Template = (args) => ({
    components: { TimeInput },
    setup() {
        return args
    },
    template: `<TimeInput />`,
})

export const Default = Template.bind({})

Default.args = {}
