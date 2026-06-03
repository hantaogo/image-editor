<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import IconButton from '../../../components/IconButton'

const canvas = inject('canvas')

const textAlign = ref('')

let target = null

onMounted(() => {
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Textbox) {
    target = pTarget
    textAlign.value = target.textAlign || ''
  } else {
    target = null
    textAlign.value = ''
  }
}

const onAlignLeft = () => {
  textAlign.value = 'left'
  target.textAlign = textAlign.value
  target.dirty = true
  canvas().requestRenderAll()
}

const onAlignCenter = () => {
  textAlign.value = 'center'
  target.textAlign = textAlign.value
  target.dirty = true
  canvas().requestRenderAll()
}

const onAlignRight = () => {
  textAlign.value = 'right'
  target.textAlign = textAlign.value
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <Box spaceY1>
    <Box>对齐</Box>
    <Box row spaceX2>
      <IconButton icon="align-left" width="42" :highlight="textAlign === 'left'" @click="onAlignLeft"></IconButton>
      <IconButton icon="align-center" width="42" :highlight="textAlign === 'center'" @click="onAlignCenter"></IconButton>
      <IconButton icon="align-right" width="42" :highlight="textAlign === 'right'" @click="onAlignRight"></IconButton>
    </Box>
  </Box>
</template>