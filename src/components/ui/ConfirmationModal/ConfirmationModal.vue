<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import keys from '../../keys'
import Dialog from '../Dialog'
import Button from '../Buttons'
const props = defineProps({
    title: {
        type: String,
    },
    bodyText: {
        type: String,
    },
    buttonText: {
        type: String,
        default: 'Confirm',
    },
    cancellable: {
        type: Boolean,
        default: true,
    },
    cancelText: {
        type: String,
        default: 'Cancel',
    },
    danger: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['cancel', 'confirm'])

const escBinding = ref(null)
const enterBinding = ref(null)

const color = computed(() => (props.danger ? 'red-600' : 'blue-600'))

const dismiss = () => emit('cancel')
const submit = () => emit('confirm')

escBinding.value = keys.bind('esc', dismiss())
enterBinding.value = keys.bind('enter', submit())

onBeforeUnmount(() => {
    escBinding.value.destroy()
    enterBinding.value.destroy()
})
</script>
<template>
    <Dialog :is-open="true" @close="dismiss">
        <h3 class="mb-4 h4">{{ title }}</h3>
        <div class="flex-1 text-gray">
            <p v-if="bodyText" v-text="bodyText" />
            <slot v-else>
                <p>Are you sure?</p>
            </slot>
        </div>
        <div class="text-right mt-6">
            <Button class-name="ltr:mr-2 rtl:ml-2" variant="plain" @click="dismiss"> {{ cancelText }}</Button>
            <Button variant="solid" :color="color" @click="submit"> {{ buttonText }}</Button>
        </div>
    </Dialog>
</template>
