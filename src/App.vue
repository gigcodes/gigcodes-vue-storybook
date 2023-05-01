<script setup>
import { AcademicCapIcon } from "@heroicons/vue/24/solid";
import HelloWorld from "./components/HelloWorld.vue";
import Alert from "./components/ui/Alert/Alert.vue";
import Button from "./components/ui/Buttons";
import "./assets/styles/app.css";
</script>

<template>
  <html dir="ltr">
    <HelloWorld msg="Vite + Vue" class="iuasda" />
    <Alert show-icon closable type="success"
      >Additional description and information about copywriting
    </Alert>
    <Button variant="solid" loading> Click Me! </Button>
    <Button size="lg" variant="twoTone" shape="none" block
      ><template #icon><AcademicCapIcon class="h-4" /></template> Default</Button
    >
  </html>
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
