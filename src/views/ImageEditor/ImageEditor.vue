<script setup>
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import Layout from './layout'
import CanvasSizeSettingDialog from './dialogs/CanvasSizeSettingDialog'
import CanvasSaveDialog from './dialogs/CanvasSaveDialog'
import { sharedEventHub } from '@/utils/eventhub'

let canvas = null

const imageEditor = ref('imageEditor')

provide('canvas', () => {
  return canvas
})

onMounted(() => {
  sharedEventHub.on('canvasCreated', onCanvasCreated)
  sharedEventHub.on('fullscreen', onFullscreen)
})

onBeforeUnmount(() => {
  sharedEventHub.off('canvasCreated', onCanvasCreated)
  sharedEventHub.off('fullscreen', onFullscreen)
  offCanvasEvents()
})

const onCanvasCreated = pCanvas => {
  canvas = pCanvas
  onCanvasEvents()
}

const onCanvasEvents = () => {
  canvas.on('object:modified', onObjectModified)
  canvas.on('selection:created', onSelectionCreated)
  canvas.on('selection:updated', onSelectionUpdated)
  canvas.on('selection:cleared', onSelectionCleared)
}

const offCanvasEvents = () => {
  canvas.off('object:modified', onObjectModified)
  canvas.off('selection:created', onSelectionCreated)
  canvas.off('selection:updated', onSelectionUpdated)
  canvas.off('selection:cleared', onSelectionCleared)
}

const onObjectModified = e => {
  sharedEventHub.emit('objectModified', e.target)
}

const onSelectionCreated = e => {
  onSelectionChanged(e.target)
}
const onSelectionUpdated = e => {
  onSelectionChanged(e.target)
}
const onSelectionCleared = e => {
  onSelectionChanged(null)
}
const onSelectionChanged = target => {
  sharedEventHub.emit('selectionChanged', target)
}
const onFullscreen = () => {
  const el = imageEditor.value
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  } else {
    if (el.requestFullscreen) {
      el.requestFullscreen()
    }
  }
}
</script>

<template>
  <div ref="imageEditor" style="width: 100%; height: 100%;">
    <!-- 布局 -->
    <Layout/>
    <!-- 弹窗 -->
    <CanvasSizeSettingDialog/>
    <CanvasSaveDialog/>
  </div>
</template>
