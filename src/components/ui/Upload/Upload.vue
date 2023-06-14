<template>
    <div ref="upload" :class="uploadClass" v-on="draggable ? draggableProp : {}" @click="triggerUpload">
        <input
            ref="fileInputField"
            :class="uploadInputClass"
            type="file"
            :disabled="disabled"
            :multiple="multiple"
            :accept="accept"
            :title="''"
            v-bind="rest"
            @change="onNewFileUpload"
        />
        <Button v-if="!draggable && !slots.default" :disabled="disabled" @click="(e) => e.preventDefault()">
            Upload
        </Button>
        <template v-else-if="draggable && !slots.default">
            <span>Choose a file or drag and drop here</span>
        </template>
        <slot v-else />
    </div>
    {{ tip }}
    <div v-if="showList" class="upload-file-list">
        <FileItem v-for="(file, index) in files" :key="file.name + index" :file="file">
            <CloseButton class="upload-file-remove" @click="() => removeFile(index)" />
        </FileItem>
    </div>
</template>

<script setup>
import { computed, inject, ref, useAttrs, useSlots, watchEffect } from 'vue'
import { DEFAULT_CONFIG } from '../utils/constant'

import classNames from 'classnames'
import PropTypes from 'vue-types'
import cloneDeep from 'lodash/cloneDeep'
import FileItem from './FileItem.vue'
import Button from '../Buttons'
import CloseButton from '../CloseButton'
import { createToaster } from '../Toast'

defineOptions({
    useAttrs: false,
})
const slots = useSlots()
const { class: className, ...rest } = useAttrs()
const filesToArray = (files) => Object.keys(files).map((key) => files[key])
const props = defineProps({
    accept: PropTypes.string,
    beforeUpload: PropTypes.func.default(undefined),
    disabled: PropTypes.bool.def(false),
    draggable: PropTypes.bool.def(false),
    fileList: {
        type: Array,
        default: () => [],
    },
    multiple: PropTypes.bool,
    onFileRemove: PropTypes.func.default(undefined),
    showList: PropTypes.bool,
    tip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    uploadLimit: PropTypes.number,
    field: PropTypes.object,
    form: PropTypes.object,
})

const fileInputField = ref(null)
const files = ref(props.fileList)
const dragOver = ref(false)

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)
const emit = defineEmits(['change'])
watchEffect(() => {
    files.value = props.fileList
})

const pushFile = (newFiles, file) => {
    for (let f of newFiles) {
        file.push(f)
    }
    return file
}

const addNewFiles = (newFiles) => {
    let file = cloneDeep(files.value)
    if (typeof props.uploadLimit === 'number' && props.uploadLimit !== 0) {
        if (Object.keys(file).length >= props.uploadLimit) {
            if (props.uploadLimit === 1) {
                file.shift()
                file = pushFile(newFiles, file)
            }
            return filesToArray({ ...file })
        }
    }
    file = pushFile(newFiles, file)
    return filesToArray({ ...file })
}

const onNewFileUpload = (e) => {
    const { files: newFiles } = e.target
    let result = true
    if (props.beforeUpload) {
        result = props.beforeUpload(newFiles, files.value)

        if (result === false) {
            createToaster.danger('Upload Failed')
            return
        }

        if (typeof result === 'string' && result.length > 0) {
            createToaster.danger(result)
            return
        }
    }

    if (result) {
        let updatedFiles = addNewFiles(newFiles)
        files.value = updatedFiles
        emit('change', {
            updatedFiles,
            files: files.value,
        })
    }
}

const removeFile = (fileIndex) => {
    const deletedFileList = files.value.filter((_, index) => index !== fileIndex)
    files.value = deletedFileList
    props.onFileRemove?.(deletedFileList)
}

const triggerUpload = (e) => {
    if (!props.disabled) {
        fileInputField.value?.click()
    }
    e.stopPropagation()
}

const handleDragLeave = () => {
    if (props.draggable) {
        dragOver.value = false
    }
}

const handleDragOver = () => {
    if (props.draggable && !props.disabled) {
        dragOver.value = true
    }
}

const handleDrop = () => {
    if (props.draggable) {
        dragOver.value = false
    }
}

const draggableProp = {
    dragleave: handleDragLeave,
    dragover: handleDragOver,
    drop: handleDrop,
}

const draggableEventFeedbackClass = computed(() => `border-${themeColor}-${primaryColorLevel}`)

const uploadClass = computed(() =>
    classNames(
        'upload',
        props.draggable && 'upload-draggable',
        props.draggable && !props.disabled && `hover:${draggableEventFeedbackClass.value}`,
        props.draggable && props.disabled && 'disabled',
        dragOver.value && draggableEventFeedbackClass.value,
        className
    )
)

const uploadInputClass = computed(() => classNames('upload-input', props.draggable && 'draggable'))
</script>
