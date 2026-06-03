<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import Slider from '../../../components/Slider'
import ColorField from '@/components/ColorField'
import PropBlock from '@/views/ImageEditor/components/PropBlock'

const canvas = inject('canvas')

let target = null

const strokeWidth = ref('')
const stroke = ref('')
const enable = ref(false)

onMounted(() => {
  // 监听事件
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Image) {
    target = pTarget
    strokeWidth.value = `${target.strokeWidth || 0}`
    stroke.value = `${target.stroke || ''}`
    enable.value = target.stroke ? true : false
  } else {
    target = null
    stroke.value = ''
    strokeWidth.value = ''
    enable.value = false
  }
}

const onEnableChange = val => {
  console.log('ImagePanel.onEnableChange', val)
  if (val) {
    // 默认描边
    stroke.value = '#ff0000'
    strokeWidth.value = '0.2'
    target.stroke = stroke.value
    target.strokeWidth = parseFloat(strokeWidth.value)
    target.dirty = true
    canvas().requestRenderAll()
  } else {
    // 删除描边
    target.stroke = null
    target.strokeWidth = null
    target.dirty = true
    canvas().requestRenderAll()
  }
}

const onStrokeWidthChange = val => {
  strokeWidth.value = val
  target.strokeWidth = parseFloat(val)
  target.dirty = true
  canvas().requestRenderAll()
}

const onStrokeChange = val => {
  target.stroke = val
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <PropBlock v-model="enable" @change="onEnableChange" label="轮廓">
    <ColorField label="轮廓颜色" v-model="stroke" @change="val => onStrokeChange(val)"/>
    <Box spaceY1>
      <Box>轮廓宽度</Box>
      <Slider :value="strokeWidth" min="0" max="100" step="0.01" @change="val => onStrokeWidthChange(val)"/>
    </Box>
  </PropBlock>
</template>