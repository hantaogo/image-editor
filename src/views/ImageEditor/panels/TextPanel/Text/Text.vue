<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import TextArea from '../../../components/TextArea'

const canvas = inject('canvas')

const text = ref('')

let target = null

onMounted(() => {
  console.log('已有字体：', document.fonts)
  // 监听事件
  sharedEventHub.on('objectModified', onObjectModified)
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('objectModified', onObjectModified)
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onObjectModified = pTarget => {
  if (pTarget instanceof fabric.Textbox) {
    text.value = pTarget.text
  }
}

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Textbox) {
    target = pTarget
    text.value = target.text
  } else {
    target = null
    text.value = ''
  }
}

const onTextChange = val => {
  text.value = val
  target.text = val
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <Box spaceY1>
    <Box>文本</Box>
    <TextArea :value="text" @change="val => onTextChange(val)"/>
  </Box>
</template>