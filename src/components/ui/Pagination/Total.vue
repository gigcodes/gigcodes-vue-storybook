<script setup>
defineProps({
    total: Number,
})
</script>
<template>
    <div class="pagination-total">
        Total <span>{{ total }}</span> Items
    </div>
</template>
