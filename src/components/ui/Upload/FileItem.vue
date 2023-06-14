<script setup>
import { defineComponent, computed } from 'vue'
import { VscFilePdf, VscFileZip, VscFile } from 'vue-icons/vsc'
const BYTE = 1000
const props = defineProps({
    file: Object,
})
const getKB = (bytes) => Math.round(bytes / BYTE)
const FileIcon = defineComponent({
    template: `<span class="text-4xl"><slot /></span>`,
})
const isImageFile = computed(() => props.file.type.split('/')[0] === 'image')
</script>
<template>
    <div class="upload-file">
        <div class="flex">
            <div class="upload-file-thumbnail">
                <img
                    v-if="isImageFile"
                    class="upload-file-image"
                    :src="URL.createObjectURL(props.file)"
                    :alt="`file preview ${props.file.name}`"
                />
                <FileIcon v-else-if="file.type === 'application/zip'"><VscFileZip /></FileIcon>
                <FileIcon v-else-if="file.type === 'application/pdf'"><VscFilePdf /></FileIcon>
                <FileIcon v-else><VscFile /></FileIcon>
            </div>
            <div class="upload-file-info">
                <h6 class="upload-file-name">{{ file.name }}</h6>
                <span class="upload-file-size">{{ getKB(file.size) }} kb</span>
            </div>
        </div>
        <slot />
    </div>
</template>
