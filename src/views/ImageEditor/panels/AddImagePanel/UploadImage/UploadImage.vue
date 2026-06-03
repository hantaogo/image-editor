<script setup>
import { ref, inject } from 'vue'
import BigButton from '../../../components/BigButton'
import Box from '@/fower/Box.vue'
import { fabric } from 'fabric'
import { sharedEventHub } from '@/utils/eventhub'
import { randomId } from '@/utils/string'

const canvas = inject('canvas')

const input = ref(null)

const upload = () => {
  input.value.click()
}

const onUpload = e => {
  const files = e.target.files
  if (files.length < 1) {
    return
  }
  const file = files[0]
  // 读取文件
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = event => {
    e.target.value = ''
    const src = event.target.result
    const img = new Image()
    img.src = src
    img.onload = () => {
      const image = new fabric.Image(img)
      image.id = randomId()
      image.type = 'Image'
      canvas().add(image).setActiveObject(image)
      sharedEventHub.emit('objectAdded', image)
    }
  }
}
</script>

<template>
  <Box column spaceY6 p4>
    <BigButton @click="upload">上传</BigButton>
    <input ref="input" v-show="false" type="file" @change="onUpload"/>
  </Box>
</template>