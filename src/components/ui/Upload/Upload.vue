<template>
    <div
        ref="upload"
        :class="uploadClass"
        v-bind="draggable ? { ...draggableProp, ...rest } : rest"
        @click="triggerUpload"
    >
        <input
            ref="fileInputField"
            :class="uploadInputClass"
            type="file"
            :disabled="disabled"
            :multiple="multiple"
            :accept="accept"
            :title="''"
            v-bind="$attrs"
            @change="onNewFileUpload"
        />
        <Button v-if="!draggable && !children" :disabled="disabled" @click="(e) => e.preventDefault()"> Upload </Button>
        <template v-else-if="draggable && !children">
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
import { ref, reactive, computed, watchEffect, useAttrs, inject } from 'vue'
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
const { class: className, ...rest } = useAttrs()
const filesToArray = (files) => Object.keys(files).map((key) => files[key])
const props = defineProps({
    accept: PropTypes.string,
    beforeUpload: PropTypes.func,
    disabled: PropTypes.bool,
    draggable: PropTypes.bool,
    fileList: PropTypes.array,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    onFileRemove: PropTypes.func,
    showList: PropTypes.bool,
    tip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    uploadLimit: PropTypes.number,
    children: PropTypes.node,
    field: PropTypes.object,
    form: PropTypes.object,
})

const fileInputField = ref(null)
const files = reactive(props.fileList)
const dragOver = ref(false)

const { themeColor, primaryColorLevel } = inject('config', DEFAULT_CONFIG)

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
    let file = cloneDeep(files)
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
        result = props.beforeUpload(newFiles, files)

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
        props.onChange?.(updatedFiles, files)
    }
}

const removeFile = (fileIndex) => {
    const deletedFileList = files.filter((_, index) => index !== fileIndex)
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
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
}

const draggableEventFeedbackClass = `border-${themeColor}-${primaryColorLevel}`

const uploadClass = computed(() =>
    classNames(
        'upload',
        props.draggable && 'upload-draggable',
        props.draggable && !props.disabled && `hover:${draggableEventFeedbackClass}`,
        props.draggable && props.disabled && 'disabled',
        dragOver.value && draggableEventFeedbackClass,
        className
    )
)

const uploadInputClass = computed(() => classNames('upload-input', props.draggable && 'draggable'))
</script>
