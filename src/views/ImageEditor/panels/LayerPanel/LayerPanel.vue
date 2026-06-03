<script setup>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue'
import Box from '@/fower/Box.vue'
import Panel from '../../components/Panel'
import { sharedEventHub } from '@/utils/eventhub'
import TextButton from '../../components/TextButton'
import Thumbnail from './Thumbnail.vue'

const canvas = inject('canvas')

const layers = ref([])

const currentLayerId = ref('')

onMounted(() => {
  // 初始化图层列表
  layers.value = []
  // 监听事件
  sharedEventHub.on('objectAdded', onObjectAdded)
  sharedEventHub.on('objectRemoved', onObjectRemoved)
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onBeforeUnmount(() => {
  // 释放图层列表引用
  layers.value = []
  // 取消监听事件
  sharedEventHub.off('objectAdded', onObjectAdded)
  sharedEventHub.off('objectRemoved', onObjectRemoved)
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onObjectAdded = obj => {
  layers.value.push(obj)
}

const onObjectRemoved = obj => {
  const index = layers.value.findIndex(t => t.id === obj.id)
  if (index !== -1) {
    layers.value.splice(index, 1)
    layers.value = layers.value
  }
}

const onSelectionChanged = target => {
  currentLayerId.value = target ? target.id : ''
}

const onClickLayer = layer => {
  currentLayerId.value = layer.id
  canvas().setActiveObject(layer)
  canvas().requestRenderAll()
}

const onUp = () => {
  if (currentLayerId.value) {
    const objects = canvas().getObjects()
    const obj = objects.find(t => t.id === currentLayerId.value)
    if (obj) {
      canvas().sendBackwards(obj)
      layers.value = canvas().getObjects()
    }
  }
}

const onDown = () => {
  if (currentLayerId.value) {
    const objects = canvas().getObjects()
    const obj = objects.find(t => t.id === currentLayerId.value)
    if (obj) {
      canvas().bringForward(obj)
      layers.value = canvas().getObjects()
    }
  }
}
</script>

<template>
  <Panel title="图层" width="110">
    <Box column spaceY4>
      <Box white toCenter textSM v-for="layer of layers" :key="layer.id">
        <Box
          square-88
          cursorPointer
          toCenter
          :style="{
            backgroundColor: '#292c31',
            border: currentLayerId === layer.id ? '2px solid #46b4eb' : '2px solid #b2b3b5'
          }"
          @click="() => onClickLayer(layer)"
        >
          <Box toCenter>
            <Thumbnail :layer="layer"/>
          </Box>
        </Box>
      </Box>
    </Box>
    <template v-slot:footer>
      <Box row toAround m2>
        <TextButton icon="up" @click="onUp"/>
        <TextButton icon="down" @click="onDown"/>
      </Box>
    </template>
  </Panel>
</template>
