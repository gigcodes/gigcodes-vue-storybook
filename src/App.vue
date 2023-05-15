<script setup>
import { AcademicCapIcon } from '@heroicons/vue/24/solid'
import HelloWorld from './components/HelloWorld.vue'
import Alert from './components/ui/Alert/Alert.vue'
import Button from './components/ui/Buttons'
import './assets/styles/app.css'
import Skeleton from './components/ui/Skeleton'
import Tag from './components/ui/Tag'
</script>

<template>
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success">Additional description and information about copywriting </Alert>
    <Button variant="solid" shape="none" color="blue-600" active> Click Me! </Button>
    <Button size="lg" variant="twoTone" shape="none" block color="blue-600">
        <template #icon><AcademicCapIcon class="h-4" /></template> Default</Button
    >
    <div class="flex flex-col gap-4">
        <Skeleton height="150" />
    </div>
    <Tag>Basic Tag</Tag>
    <Tag prefix-class="bg-emerald-500">
        <template #prefix><AcademicCapIcon class="text-base h-4 text-blue-500 mr-1 rtl:ml-1" /> </template> Tag 2
    </Tag>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
