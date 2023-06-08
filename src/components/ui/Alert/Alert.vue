<template>
    <Presence>
        <Motion
            v-if="display === 'show'"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
            class="box"
        >
            <div ref="target" :class="alertClass" v-bind="restAttrs">
                <div :class="`flex ${title ? '' : 'items-center'}`">
                    <StatusIcon
                        v-if="showIcon && !slots.customIcon"
                        :icon-color="typeMap.iconColor"
                        :type="type"
                    ></StatusIcon>
                    <slot v-if="showIcon" name="customIcon" />
                    <div :class="showIcon ? 'ltr:ml-2 rtl:mr-2' : ''">
                        <div v-if="title" :class="`font-semibold mb-1 -mt-0.5 ${typeMap.titleColor}`">
                            {{ title }}
                        </div>
                        <slot />
                    </div>
                </div>
                <div v-if="closable" class="cursor-pointer" @click="handleClose">
                    <slot name="customClose" class="h-4" />
                    <CloseButton v-if="!slots.customClose" :default-style="false" />
                </div>
            </div>
        </Motion>
    </Presence>
</template>

<script setup>
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'
import { computed, ref, useAttrs, useSlots } from 'vue'
import useTimeout from '../../hooks/useTimeout.js'
import classNames from 'classnames'
import CloseButton from '../CloseButton'
import StatusIcon from '../StatusIcon'
import { Motion, Presence } from 'motion/vue'

const { class: className, ...restAttrs } = useAttrs()
const slots = useSlots()

const emits = defineEmits(['onClose'])
defineOptions({
    inheritAttrs: false,
})
const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return ['info', 'success', 'warning', 'danger'].includes(value)
        },
        default: 'warning',
    },
    duration: {
        type: Number,
        default: 3000,
    },
    triggerByToast: {
        type: Boolean,
        default: false,
    },
    closable: {
        type: Boolean,
        default: false,
    },
    showIcon: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: null,
    },
})

const TYPE_MAP = {
    success: {
        backgroundColor: 'bg-emerald-50 dark:bg-emerald-500',
        titleColor: 'text-emerald-700 dark:text-emerald-50',
        textColor: 'text-emerald-500 dark:text-emerald-50',
        iconColor: 'text-emerald-400 dark:text-emerald-50',
        icon: CheckCircleIcon,
    },
    info: {
        backgroundColor: 'bg-blue-50 dark:bg-blue-500',
        titleColor: 'text-blue-700 dark:text-blue-100',
        textColor: 'text-blue-500 dark:text-blue-100',
        iconColor: 'text-blue-400 dark:text-blue-100',
        icon: InformationCircleIcon,
    },
    warning: {
        backgroundColor: 'bg-yellow-50 dark:bg-yellow-500',
        titleColor: 'text-yellow-700 dark:text-yellow-50',
        textColor: 'text-yellow-500 dark:text-yellow-50',
        iconColor: 'text-yellow-400 dark:text-yellow-50',
        icon: ExclamationCircleIcon,
    },
    danger: {
        backgroundColor: 'bg-red-50 dark:bg-red-500',
        titleColor: 'text-red-700 dark:text-red-100',
        textColor: 'text-red-500 dark:text-red-100',
        iconColor: 'text-red-400 dark:text-red-100',
        icon: XCircleIcon,
    },
}

const typeMap = computed(() => TYPE_MAP[props.type])

const display = ref('show')

const { clear } = useTimeout(() => emits('onClose'), props.duration, props.duration > 0)

const handleClose = () => {
    emits('onClose')
    clear()
    if (!props.triggerByToast) {
        display.value = 'hide'
    }
}

const alertDefaultClass = 'p-4 relative flex'

const alertClass = computed(() =>
    classNames(
        'alert',
        alertDefaultClass,
        typeMap.value.backgroundColor,
        typeMap.value.textColor,
        !props.title ? 'font-semibold' : '',
        props.closable ? 'justify-between' : '',
        props.closable && !props.title ? 'items-center' : '',
        'rounded-lg',
        className
    )
)
</script>
