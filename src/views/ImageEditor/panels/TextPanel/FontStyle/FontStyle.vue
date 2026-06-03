<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import IconButton from '../../../components/IconButton'

const canvas = inject('canvas')

const fontStyle = ref('')

const fontWeight = ref('')

let target = null

onMounted(() => {
  // 监听事件
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Textbox) {
    target = pTarget
    fontStyle.value = target.fontStyle || 'normal'
    fontWeight.value = target.fontWeight || 'normal'
  } else {
    target = null
    fontStyle.value = 'normal'
    fontWeight.value = 'normal'
  }
}

const onItalic = () => {
  if (target.fontStyle === 'italic') {
    fontStyle.value = 'normal'
    target.fontStyle = fontStyle.value
  } else {
    fontStyle.value = 'italic'
    target.fontStyle = fontStyle.value
  }
  target.dirty = true
  canvas().requestRenderAll()
}

const onBold = () => {
  if (target.fontWeight === 'bold') {
    fontWeight.value = 'normal'
    target.fontWeight = fontWeight.value
  } else {
    fontWeight.value = 'bold'
    target.fontWeight = fontWeight.value
  }
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <Box spaceY1>
    <Box>风格</Box>
    <Box row spaceX2>
      <IconButton icon="italic" width="42" :highlight="fontStyle === 'italic'" @click="onItalic"></IconButton>
      <IconButton icon="bold" width="42" :highlight="fontWeight === 'bold'" @click="onBold"></IconButton>
    </Box>
  </Box>
</template>