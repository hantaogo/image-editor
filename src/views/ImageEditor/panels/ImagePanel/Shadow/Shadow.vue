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

const shadowColor = ref('')
const shadowOffsetX = ref('')
const shadowOffsetY = ref('')
const shadowBlur = ref('')
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
    if (target.shadow) {
      enable.value = true
      const shadow = target.shadow
      shadowColor.value = `#${new fabric.Color(shadow.color).toHex()}`
      shadowOffsetX.value = `${shadow.offsetX}`
      shadowOffsetY.value = `${shadow.offsetY}`
      shadowBlur.value = `${shadow.blur}`
    } else {
      enable.value = false
    }
  } else {
    target = null
    shadowColor.value = ''
    shadowOffsetX.value = ''
    shadowOffsetY.value = ''
    shadowBlur.value = ''
    enable.value = false
  }
}

const onEnableChange = val => {
  if (val) {
    shadowColor.value = '#777'
    shadowOffsetX.value = '2'
    shadowOffsetY.value = '2'
    shadowBlur.value = '2'
    updateShadow()
  } else {
    target.shadow = null
    target.dirty = true
    canvas().requestRenderAll()
  }
}

const onShadowColorChange = val => {
  updateShadow()
}

const onShadowOffsetXChange = val => {
  shadowOffsetX.value = val
  updateShadow()
}

const onShadowOffsetYChange = val => {
  shadowOffsetY.value = val
  updateShadow()
}

const onShadowBlurChange = val => {
  shadowBlur.value = val
  updateShadow()
}

const updateShadow = () => {
  const shadow = new fabric.Shadow()
  shadow.color = fabric.Color.fromHex(shadowColor.value).toRgb()
  shadow.offsetX = parseFloat(shadowOffsetX.value)
  shadow.offsetY = parseFloat(shadowOffsetY.value)
  shadow.blur = parseFloat(shadowBlur.value)
  target.shadow = shadow
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <PropBlock v-model="enable" @change="onEnableChange" label="阴影">
    <ColorField label="阴影颜色" v-model="shadowColor" @change="onShadowColorChange"/>
    <Box spaceY1>
      <Box>横向偏移</Box>
      <Slider :value="shadowOffsetX" min="-20" max="20" step="0.1" @change="val => onShadowOffsetXChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>纵向偏移</Box>
      <Slider :value="shadowOffsetY" min="-20" max="20" step="0.1" @change="val => onShadowOffsetYChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>模糊</Box>
      <Slider :value="shadowBlur" min="0" max="20" step="0.1" @change="val => onShadowBlurChange(val)"/>
    </Box>
  </PropBlock>
</template>