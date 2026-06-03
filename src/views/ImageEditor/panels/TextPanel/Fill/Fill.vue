<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import ColorField from '@/components/ColorField'
import PropBlock from '@/views/ImageEditor/components/PropBlock'

const canvas = inject('canvas')

let target = null

const fill = ref('')
const enable = ref(false)

onMounted(() => {
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Textbox) {
    target = pTarget
    fill.value = target.fill || '#ffffff'
    enable.value = target.fill ? true : false
  } else {
    target = null
    enable.value = false
  }
}

const onEnableChange = val => {
  if (val) {
    // 默认描边
    fill.value = '#ffffff'
    target.fill = fill.value
    target.dirty = true
    canvas().requestRenderAll()
  } else {
    target.fill = null
    target.dirty = true
    canvas().requestRenderAll()
  }
}

const onFillChange = val => {
  target.fill = fill.value
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <PropBlock v-model="enable" @change="onEnableChange" label="填充">
    <ColorField v-show="enable" label="填充颜色" v-model="fill" @change="onFillChange"/>
  </PropBlock>
</template>