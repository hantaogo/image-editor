<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import BigButton from '@/views/ImageEditor/components/BigButton'

const canvas = inject('canvas')

let target = null

onMounted(() => {
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Image) {
    target = pTarget
  } else {
    target = null
  }
}

const onClick = () => {
  if (target) {
    const objects = canvas().getObjects()
    const obj = objects.find(t => t.id === target.id)
    if (obj) {
      canvas().remove(obj)
    }
    canvas().discardActiveObject()
    canvas().requestRenderAll()
    sharedEventHub.emit('objectRemoved', target)
    target = null
  }
}
</script>

<template>
  <BigButton @click="onClick">删除</BigButton>
</template>