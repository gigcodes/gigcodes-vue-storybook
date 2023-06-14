<script setup>
import { computed, h } from 'vue'
import PdfIcon from '@/components/icons/PdfIcon.vue'
import ZipIcon from '@/components/icons/ZipIcon.vue'
import FIcon from '@/components/icons/FileIcon.vue'

const BYTE = 1000
const props = defineProps({
    file: Object,
})
const getKB = (bytes) => Math.round(bytes / BYTE)
const FileIcon = h('span', { class: 'text-4xl' })
const isImageFile = computed(() => props.file.type.split('/')[0] === 'image')
const imageUrl = computed(() => isImageFile.value && URL.createObjectURL(props.file))
</script>
<template>
    <div class="upload-file">
        <div class="flex">
            <div class="upload-file-thumbnail">
                <img v-if="isImageFile" class="upload-file-image" :src="imageUrl" :alt="`file preview ${file.name}`" />
                <FileIcon v-else-if="file.type === 'application/zip'">
                    <ZipIcon />
                </FileIcon>
                <FileIcon v-else-if="file.type === 'application/pdf'">
                    <PdfIcon />
                </FileIcon>
                <FileIcon v-else>
                    <FIcon />
                </FileIcon>
            </div>
            <div class="upload-file-info">
                <h6 class="upload-file-name">{{ file.name }}</h6>
                <span class="upload-file-size">{{ getKB(file.size) }} kb</span>
            </div>
        </div>
        <slot />
    </div>
</template>
