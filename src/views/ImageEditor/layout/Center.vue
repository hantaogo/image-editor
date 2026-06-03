<script setup>
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import ScrollLayer from '@/components/ScrollLayer'

const container = ref(null)

let canvas = null
let width = 640
let height = 960
let backgroundColor = '#c1c1c1'

onMounted(() => {
  // 更新区域
  nextTick(() => {
    canvas = new fabric.Canvas('canvas')
    const rect = container.value.getBoundingClientRect()
    const size = { width: Math.floor(rect.width), height: Math.floor(rect.height) }
    canvas.setWidth(size.width)
    canvas.setHeight(size.height)
    canvas.setBackgroundColor(backgroundColor)
    canvas.selection = false
    canvas.controlsAboveOverlay = true
    initCamera()
    updateClipPath()
    sharedEventHub.emit('canvasCreated', canvas)
    sharedEventHub.on('canvasSizeChanged', onCanvasSizeChanged)
  })
})

onBeforeUnmount(() => {
  sharedEventHub.off('canvasSizeChanged', onCanvasSizeChanged)
})

const onCanvasSizeChanged = (size) => {
  width = size.width
  height = size.height
  updateClipPath()
  nextTick(() => {
    const rect = container.value.getBoundingClientRect()
    const size = { width: Math.floor(Math.max(rect.width, width)), height: Math.floor(Math.max(rect.width, height)) }
    canvas.setWidth(size.width)
    canvas.setHeight(size.height)
  })
}

const updateClipPath = () => {
  canvas.clipPath = new fabric.Rect({ left: 0, top: 0, width, height })
  const rect = container.value.getBoundingClientRect()
  const vpt = canvas.viewportTransform
  vpt[0] = 1
  vpt[1] = 0
  vpt[2] = 0
  vpt[3] = 1
  vpt[4] = 16
  vpt[5] = 16
  canvas.requestRenderAll()
  canvas.zoomToPoint({ x: 16, y: 16 }, (rect.height - 32) / height)
}

const initCamera = () => {
  const oldSelection = canvas.oldSelection
  canvas.on('mouse:wheel', function(opt) {
    var evt = opt.e
    if (evt.altKey === true) {
      var delta = opt.e.deltaY
      var zoom = canvas.getZoom()
      zoom *= 0.999 ** delta
      if (zoom > 20) zoom = 20
      if (zoom < 0.01) zoom = 0.01
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
      opt.e.preventDefault()
      opt.e.stopPropagation()
    }
  })
  canvas.on('mouse:down', function(opt) {
    var evt = opt.e
    if (evt.altKey === true) {
      this.isDragging = true
      this.selection = false
      this.lastPosX = evt.clientX
      this.lastPosY = evt.clientY
    }
  })
  canvas.on('mouse:move', function(opt) {
    if (this.isDragging) {
      var e = opt.e
      var vpt = this.viewportTransform
      vpt[4] += e.clientX - this.lastPosX
      vpt[5] += e.clientY - this.lastPosY
      this.requestRenderAll()
      this.lastPosX = e.clientX
      this.lastPosY = e.clientY
    }
  })
  canvas.on('mouse:up', function(opt) {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    this.setViewportTransform(this.viewportTransform)
    this.isDragging = false
    this.selection = oldSelection
  })
}
</script>

<template>
  <div class="container" ref="container">
    <ScrollLayer :options="{ autoHide: false }">
      <canvas id="canvas"/>
    </ScrollLayer>
  </div>
</template>

<style scoped>
.container {
  flex: 1 1 auto;
  position: relative;
}
</style>
