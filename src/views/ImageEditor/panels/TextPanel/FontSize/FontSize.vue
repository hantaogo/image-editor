<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import Slider from '../../../components/Slider'

const canvas = inject('canvas')

const fontSize = ref('')

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
    fontSize.value = `${target.fontSize}`
  } else {
    target = null
    fontSize.value = ''
  }
}

const onFontSizeChange = val => {
  fontSize.value = val
  target.fontSize = val
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <Box spaceY1>
    <Box>尺寸</Box>
    <Slider :value="fontSize" min="12" max="99" step="1" @change="val => onFontSizeChange(val)"/>
  </Box>
</template>