<template>
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success">Additional description and information about copywriting</Alert>
    <Input :value="inputeVal" placeholder="Basic usage" />
    <Switcher v-model="swit" />
    <TimeInputRange v-model="date" show-seconds />
    {{ date }}
    <Upload disabled />

    <div class="md:w-[260px] max-w-[260px] mx-auto">
        <RangeCalendar />
    </div>

    <DatePickerRange />
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
import RangeCalendar from '@/components/ui/DatePicker/RangeCalendar.vue'
import DatePickerRange from '@/components/ui/DatePicker/DatePickerRange.vue'

const inputeVal = ref('karthic')
const swit = ref(false)
const date = ref()
const createToast = () => createToaster.info('hello word')
</script>
