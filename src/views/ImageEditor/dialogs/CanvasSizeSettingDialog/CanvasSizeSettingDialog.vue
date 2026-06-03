<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Dialog from '@/views/ImageEditor/components/Dialog'
import { sharedEventHub } from '@/utils/eventhub'
import Box from '@/fower/Box.vue'
import TextField from '../../components/TextField'

const dialog = ref(null)
const width = ref('')
const height = ref('')

onMounted(() => {
  sharedEventHub.on('setCanvasSize', open)
  sharedEventHub.on('canvasCreated', onCanvasCreated)
})

onUnmounted(() => {
  sharedEventHub.off('setCanvasSize', open)
  sharedEventHub.off('canvasCreated', onCanvasCreated)
})

const open = () => {
  dialog.value.open()
}

const onCanvasCreated = canvas => {
  console.log('调整画布大小，画布', canvas, canvas.clipPath)
  width.value = `${canvas.clipPath.width}`
  height.value = `${canvas.clipPath.height}`
}

const onOk = () => {
  dialog.value.close()
  sharedEventHub.emit('canvasSizeChanged', {
    width: parseInt(width.value),
    height: parseInt(height.value),
  })
}
</script>

<template>
  <Dialog ref="dialog" title="调整画布大小" okLabel="应用" @ok="onOk">
    <Box column spaceY6 p4>
      <Box toBetween>
        <Box textSM>宽度</Box>
        <Box><TextField w-55 h-28 textAlign="right" type="number" min="32" v-model="width"/></Box>
      </Box>
      <Box toBetween>
        <Box textSM>高度</Box>
        <Box><TextField w-55 h-28 textAlign="right" type="number" min="32" v-model="height"/></Box>
      </Box>
    </Box>
  </Dialog>
</template>