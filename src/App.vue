<template>
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success">Additional description and information about copywriting</Alert>
    <Button size="lg" variant="twoTone" shape="none" block color="blue-600" @click="() => createToast()">
        <template #icon>
            <AcademicCapIcon class="h-4" />
        </template>
        Show toaster
    </Button>
    <Toast ref="toaster" />
    <TimeInput />
</template>
<script setup>
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import HelloWorld from './components/HelloWorld.vue'
import Alert from '@/components/ui/Alert/Alert.vue'
import { ref } from 'vue'
import Toast from '@/components/ui/Toast/Toast.vue'
import { createToaster } from '@/components/ui/Toast'
import TimeInput from './components/ui/TimeInput/TimeInput.vue'

const toaster = ref(null)
const createToast = () => createToaster.info('hello word')
</script>
