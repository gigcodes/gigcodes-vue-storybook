import Alert from '.'

export default {
    title: 'UI/Alert',
    tags: ['autodocs'],
    component: Alert,
    argTypes: {
        type: {
            control: {
                type: 'select',
            },
            options: ['info', 'danger', 'success', 'warning'],
        },
        closable: { control: 'boolean', defaultValue: false },
        default: {
            control: {
                type: 'text',
            },
            defaultValue: 'Additional description and information about copywriting',
            meta_description: 'Alert Content',
            table: {
                type: {
                    summary: null,
                },
            },
        },
        onClose: {
            control: false,
            description: 'This event is triggered when the alert gets closed',
            table: {
                category: 'Events',
                type: {
                    summary: null,
                },
            },
        },
    },
    args: {
        type: 'info',
    },
}

const Template = (args) => ({
    components: { Alert },
    setup() {
        return args
    },
    template: `<Alert v-bind="args">${args.default}</Alert>`,
})

export const Default = Template.bind({})

Default.args = {
    default: 'Additional description and information about copywriting',
    type: 'info',
    closable: true,
    title: 'Alert',
}
