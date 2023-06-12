<template>
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success">Additional description and information about copywriting</Alert>
    <Input :value="inputeVal" placeholder="Basic usage" />
    <Switcher v-model="swit" />
    <DateTimepicker placeholder="Pick a date & time" />

    <TimeInput />
</template>
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Alert from '@/components/ui/Alert/Alert.vue'
import { ref } from 'vue'
import { createToaster } from '@/components/ui/Toast'
import Input from '@/components/ui/Input/Input.vue'
import Switcher from '@/components/ui/Switcher/Switcher.vue'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker.vue'
import TimeInput from '@/components/ui/TimeInput/TimeInput.vue'

const inputeVal = ref('karthic')
const swit = ref(false)
const createToast = () => createToaster.info('hello word')
</script>
