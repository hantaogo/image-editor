<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import Slider from '../../../components/Slider'

const canvas = inject('canvas')

const charSpacing = ref('')

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
    charSpacing.value = `${target.charSpacing || ''}`
  } else {
    target = null
    charSpacing.value = ''
  }
}

const onCharSpacingChange = val => {
  charSpacing.value = val
  target.charSpacing = val
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <Box spaceY1>
    <Box>字距</Box>
    <Slider :value="charSpacing" min="0" max="5000" step="1" @change="val => onCharSpacingChange(val)"/>
  </Box>
</template>