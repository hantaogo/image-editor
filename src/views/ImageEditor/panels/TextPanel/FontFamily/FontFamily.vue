<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import TextField from '../../../components/TextField'
import SelectFont from '../SelectFont'

const canvas = inject('canvas')

const fontFamily = ref('')

const selectFont = ref(null)

let target = null

onMounted(() => {
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Textbox) {
    target = pTarget
    fontFamily.value = target.fontFamily
    selectFont.value.close()
  } else {
    target = null
    fontFamily.value = ''
  }
}

const onClickFontFamily = () => {
  selectFont.value.open()
}

const onSelectFontOk = val => {
  const defaultFontFamily = 'Times New Roman'
  if (val !== defaultFontFamily) {
    fontFamily.value = val
    target.fontFamily = val
    target.dirty = true
    canvas().requestRenderAll()
  }
}
</script>

<template>
  <Box spaceY1>
    <Box>字体</Box>
    <TextField h-40 readonly v-model="fontFamily" @click="onClickFontFamily"/>
  </Box>
  <SelectFont ref="selectFont" @ok="onSelectFontOk"/>
</template>