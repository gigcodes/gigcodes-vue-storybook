import Button from '.'
import { AcademicCapIcon } from '@heroicons/vue/24/solid'

export default {
    title: 'UI/Button',
    tags: ['autodocs'],
    component: Button,
    argTypes: {
        variant: {
            control: {
                type: 'select',
            },
            options: ['solid', 'twoTone', 'plain', 'default'],
            defaultValue: 'default',
        },
        size: {
            control: {
                type: 'select',
            },
            options: ['lg', 'md', 'sm', 'xs'],
            defaultValue: 'md',
        },
        shape: {
            control: {
                type: 'select',
            },
            options: ['round', 'circle', 'none'],
            defaultValue: 'round',
        },
        color: {
            description: 'Tailwind class for color',
            control: {
                type: 'text',
            },
        },
        disabled: {
            control: 'boolean',
            defaultValue: false,
        },
        loading: {
            control: 'boolean',
            defaultValue: false,
        },
        block: {
            control: 'boolean',
            defaultValue: false,
        },
        active: {
            control: 'boolean',
            defaultValue: false,
        },
        icon: {
            control: false,
            description: 'Icon component to be passed',
        },
    },
}

const Template = (args) => ({
    components: { Button },
    setup() {
        return args
    },
    template: `<Button v-bind="args">Button</Button>`,
})

export const Default = Template.bind({})

Default.args = {
    variant: 'default',
    size: 'md',
    default: 'Button',
    shape: 'round',
    color: 'blue-600',
    disabled: false,
    loading: false,
    block: false,
    active: false,
}

const TemplateWithIcon = (args) => ({
    components: { Button, AcademicCapIcon },
    setup() {
        return args
    },
    template: `<Button v-bind="args"><template #icon><AcademicCapIcon class="h-4" /></template> With Icon </Button>`,
})

export const WithIcon = TemplateWithIcon.bind({})

WithIcon.args = {
    variant: 'default',
    size: 'md',
    shape: 'round',
    color: 'blue-600',
    disabled: false,
    loading: false,
    block: false,
    active: false,
}
