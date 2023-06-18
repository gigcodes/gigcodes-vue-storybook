<template>
    <HelloWorld msg="Vite + Vue" />
    <Alert show-icon closable type="success">Additional description and information about copywriting</Alert>
    <Input :value="inputeVal" placeholder="Basic usage" />
    <Switcher v-model="swit" />
    <TimeInputRange v-model="date" show-seconds />
    {{ date }}
    <Upload disabled />
    <Button @click="dia = true">Open Modal</Button>
    <DatePicker
        v-model="date1"
        :label-format="{
            month: 'MM',
            year: 'YY',
        }"
        :clearable="false"
        placeholder="Pick a date"
    />
    <Dialog :is-open="dia" @close="dia = false">
        <h5 class="mb-4">Dialog Title</h5>
        <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>
        <div class="text-right mt-6">
            <Button class-name="ltr:mr-2 rtl:ml-2" variant="plain" @click="dia = false"> Cancel</Button>
            <Button variant="solid"> Okay</Button>
        </div>
    </Dialog>

    <Listing request-url="http://127.0.0.1:8000/api/test" collection="users" />
</template>
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Alert from '@/components/ui/Alert/Alert.vue'
import { ref } from 'vue'
import Input from '@/components/ui/Input/Input.vue'
import Switcher from '@/components/ui/Switcher/Switcher.vue'
import { TimeInputRange } from './components/ui/TimeInput'
import Upload from '@/components/ui/Upload/Upload.vue'
import DatePicker from '@/components/ui/DatePicker/DatePicker.vue'
import Button from '@/components/ui/Buttons/Button.vue'
import Dialog from '@/components/ui/Dialog/Dialog.vue'
import Listing from './components/ui/Entries/Listing.vue'

const inputeVal = ref('karthic')
const swit = ref(false)
const date = ref()
const dia = ref(false)
const date1 = ref()
</script>
