<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import Slider from '../../../components/Slider'

const canvas = inject('canvas')

const lineHeight = ref('')

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
    lineHeight.value = `${target.lineHeight || ''}`
  } else {
    target = null
    lineHeight.value = ''
  }
}

const onLineHeightChange = val => {
  lineHeight.value = val
  target.lineHeight = val
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <Box spaceY1>
    <Box>行距</Box>
    <Slider :value="lineHeight" min="1" max="5" step="0.1" @change="val => onLineHeightChange(val)"/>
  </Box>
</template>