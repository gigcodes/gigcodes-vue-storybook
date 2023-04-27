<template>
    <div v-motion v-show="display !== 'hide'" ref="target" :class="alertClass" v-bind="attrs">
        <div :class="`flex ${title ? '' : 'items-center'}`">
            <StatusIcon v-if="showIcon && !slots.customIcon"
                        :icon-color="typeMap.iconColor"
                        :type="type"
            ></StatusIcon>
            <slot v-if="showIcon" name="customIcon"/>
            <div :class="showIcon ? 'ltr:ml-2 rtl:mr-2': ''">
                <div v-if="title"
                     :class="`font-semibold mb-1 -mt-0.5 ${typeMap.titleColor}`"
                >
                    {{ title }}
                </div>
                <slot/>
            </div>
        </div>
        <div v-if="closable" class="cursor-pointer" @click="handleClose">
            <slot name="customClose" class="h-4"/>
            <CloseButton v-if="!slots.customClose" :default-style="false"/>
        </div>
    </div>
</template>

<script setup>
import {
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
    XCircleIcon
} from "@heroicons/vue/24/solid"
import {ref, useAttrs, useSlots} from "vue";
import useTimeout from "../../hooks/useTimeout.js";
import classNames from 'classnames'
import {useMotion} from "@vueuse/motion";
import CloseButton from "../CloseButton";
import StatusIcon from "../StatusIcon";

const attrs = useAttrs()
const slots = useSlots()

const emits = defineEmits(['onClose'])

const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return ['info', 'success', 'warning', 'danger'].includes(value)
        }
    },
    duration: {
        type: Number,
        default: 3000
    },
    triggerByToast: {
        type: Boolean,
        default: false
    },
    closable: {
        type: Boolean,
        default: false
    },
    showIcon: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: null
    },
    customClose: {
        required: false
    }
})

const DEFAULT_TYPE = 'warning'

const TYPE_ARRAY = ['success', 'danger', 'info', 'warning']

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

const getType = () => {
    const {type} = props
    if (TYPE_ARRAY.includes(type)) {
        return type
    }
    return DEFAULT_TYPE
}

const type = getType()

const typeMap = TYPE_MAP[type]

const display = ref('show')

const {clear} = useTimeout(emits('onClose'), props.duration, props.duration > 0)

const handleClose = (e) => {
    display.value = "hiding"
    emits('onClose', e)
    clear()
    if (!props.triggerByToast) {
        setTimeout(() => {
            display.value = "hide"
        }, 400)
    }
}

const alertDefaultClass = 'p-4 relative flex'

const alertClass = classNames(
    'alert',
    alertDefaultClass,
    typeMap.backgroundColor,
    typeMap.textColor,
    !props.title ? 'font-semibold' : '',
    props.closable ? 'justify-between' : '',
    props.closable && !props.title ? 'items-center' : '',
    'rounded-lg',
)

const target = ref < HTMLElement > null


const motionInstance = useMotion(target, {
    initial: {
        opacity: 1,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.25,
            type: 'tween'
        },
    },
    leave: {
        opacity: 1,
    }
})

</script>