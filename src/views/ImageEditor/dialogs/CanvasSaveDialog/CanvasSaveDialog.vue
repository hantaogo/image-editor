<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Dialog from '@/views/ImageEditor/components/Dialog'
import { sharedEventHub } from '@/utils/eventhub'
import { downloadUrl } from '@/utils/file'
import Box from '@/fower/Box.vue'
import TextField from '../../components/TextField/TextField.vue'
import Select from '@/components/Select/Select.vue'
import { randomId } from '@/utils/string'

const canvas = inject('canvas')

const dialog = ref(null)

const filename = ref('')
const format = ref('jpeg')
const quality = ref('100')
const multiplier = ref('100')

onMounted(() => {
  sharedEventHub.on('save', open)
})

onUnmounted(() => {
  sharedEventHub.off('save', open)
})

const open = () => {
  dialog.value.open()
}

const onOk = () => {
  dialog.value.close()
  const c = canvas()
  const transform = c.viewportTransform.slice()
  c.viewportTransform = [1, 0, 0, 1, 0, 0]
  const options = {
    format: format.value,
    quality: parseFloat(quality.value) / 100,
    multiplier: parseFloat(multiplier.value) / 100,
    left: c.clipPath.left,
    top: c.clipPath.top,
    width: c.clipPath.width,
    height: c.clipPath.height,
  }
  const url = c.toDataURL(options)
  c.viewportTransform = transform
  const name = filename.value || randomId()
  downloadUrl(url, `${name}.${format.value}`)
}
</script>

<template>
  <Dialog ref="dialog" title="储存选项" height="350px" okLabel="储存" @ok="onOk">
    <Box spaceY6 p4 textSM>
      <Box row toBetween>
        <Box>文件名</Box>
        <TextField w-80 v-model="filename" textAlign="right"/>
      </Box>
      <Box row toBetween>
        <Box>格式</Box>
        <Select w-80 v-model="format" :options="[{ value: 'jpeg', label: 'JPEG' }, { value: 'png', label: 'PNG' }]"/>
      </Box>
      <Box row toBetween v-if="format === 'jpeg'">
        <Box>质量</Box>
        <TextField w-80 v-model="quality" textAlign="right" type="number" min="1" max="100"/>
      </Box>
      <Box row toBetween>
        <Box>缩放</Box>
        <TextField w-80 v-model="multiplier" textAlign="right" type="number" min="1" max="100"/>
      </Box>
    </Box>
  </Dialog>
</template>