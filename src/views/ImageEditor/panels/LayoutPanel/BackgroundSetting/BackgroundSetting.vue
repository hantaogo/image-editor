<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import ColorField from '@/components/ColorField'

let canvas = null

const color = ref('')

onMounted(() => {
  sharedEventHub.on('canvasCreated', onCanvasCreated)
})

onBeforeUnmount(() => {
  sharedEventHub.off('canvasCreated', onCanvasCreated)
})

const onCanvasCreated = pCanvas => {
  canvas = pCanvas
  color.value = pCanvas.backgroundColor
}

const onColorChange = val => {
  if (!canvas) {
    return
  }
  canvas.setBackgroundColor(val)
  canvas.requestRenderAll()
}
</script>

<template>
  <ColorField v-model="color" @change="onColorChange"></ColorField>
</template>

<style>
</style>