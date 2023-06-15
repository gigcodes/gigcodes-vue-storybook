<template>
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success">Additional description and information about copywriting</Alert>
    <Input :value="inputeVal" placeholder="Basic usage" />
    <Switcher v-model="swit" />
    <TimeInputRange v-model="date" show-seconds />
    {{ date }}
    <Upload disabled />

    <DatePicker
        v-model="date1"
        :label-format="{
            month: 'MM',
            year: 'YY',
        }"
        :clearable="false"
        placeholder="Pick a date"
    />
    <Select />
</template>
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Alert from '@/components/ui/Alert/Alert.vue'
import { ref } from 'vue'
import { createToaster } from '@/components/ui/Toast'
import Input from '@/components/ui/Input/Input.vue'
import Switcher from '@/components/ui/Switcher/Switcher.vue'
import { TimeInputRange } from './components/ui/TimeInput'
import Upload from '@/components/ui/Upload/Upload.vue'
import DatePicker from '@/components/ui/DatePicker/DatePicker.vue'
import Select from '@/components/ui/Select/Select.vue'

const inputeVal = ref('karthic')
const swit = ref(false)
const date = ref()
const date1 = ref()
const date12 = ref()
const createToast = () => createToaster.info('hello word')
</script>
