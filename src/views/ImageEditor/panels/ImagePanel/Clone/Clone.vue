<script setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import BigButton from '@/views/ImageEditor/components/BigButton'
import { randomId } from '@/utils/string'

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
    target.clone(obj => {
      obj.id = randomId()
      obj.type = 'Image'
      obj.left = target.left + 16
      obj.top = target.top + 16
      canvas().add(obj).setActiveObject(obj)
      target = obj
      sharedEventHub.emit('objectAdded', obj)
    })
  }
}
</script>

<template>
  <BigButton @click="onClick">克隆</BigButton>
</template>