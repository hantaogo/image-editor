<script setup>
import { randomId } from '@/utils/string'
import { ref, inject, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { fabric } from 'fabric'
import { sharedEventHub } from '@/utils/eventhub'

const props = defineProps({
  layer: {
    type: Object,
    require: true,
  },
})

const canvas = inject('canvas')

const canvasId = ref('')

let staticCanvas = null
let obj = null

onBeforeMount(() => {
  canvasId.value = randomId()
})

onMounted(() => {
  // 初始化静态画板
  staticCanvas = new fabric.StaticCanvas(canvasId.value)
  staticCanvas.setWidth(80)
  staticCanvas.setHeight(80)
  // 复制后添加
  props.layer.clone(objectClone => {
    obj = objectClone
    obj.id = props.layer.id
    obj.type = props.layer.type
    obj.scaleToWidth(80)
    staticCanvas.add(obj)
    staticCanvas.centerObject(obj)
  })
  // 监听修改事件
  sharedEventHub.on('objectModified', onObjectModified)
})

onBeforeUnmount(() => {
  sharedEventHub.off('objectModified', onObjectModified)
  staticCanvas = null
  obj = null
})

const onObjectModified = target => {
  if (obj && obj.id === target.id) {
    staticCanvas.remove(obj)
    // 复制后添加
    target.clone(objectClone => {
      obj = objectClone
      obj.id = target.id
      obj.type = target.type
      obj.scaleToWidth(80)
      staticCanvas.add(obj)
      staticCanvas.centerObject(obj)
    })
  }
}
</script>

<template>
  <canvas :id="canvasId"/>
</template>

<style scoped>
.layer-canvas {
  background-image: url('./assets/square-bg.png');
  background-position: 50% 50%;
  background-size: 20px 20px;
  margin: 0 auto;
}
</style>