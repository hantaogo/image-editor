<script setup>
import { inject } from 'vue'
import Panel from '../../components/Panel'
import Box from '@/fower/Box.vue'
import { sharedEventHub } from '@/utils/eventhub'
import { randomId } from '@/utils/string'

const canvas = inject('canvas')

const addText = (str, fontSize) => {
  const textbox = new fabric.Textbox(str, { left: 0, top: 0, fill: '#ffffff', fontFamily: 'Times New Roman', fontSize })
  textbox.id = randomId()
  textbox.type = 'Textbox'
  canvas().add(textbox).setActiveObject(textbox)
  sharedEventHub.emit('objectAdded', textbox)
}
</script>

<template>
  <Panel width="260" title="添加文字">
    <Box column spaceY6 m4>
      <Box text4XL cursorPointer toCenter white w="100%" border="2px dashed white" @click="addText('标题', 36)">标题</Box>
      <Box text2XL cursorPointer toCenter white w="100%" border="2px dashed white" @click="addText('副标题', 24)">副标题</Box>
      <Box textSM cursorPointer toCenter white w="100%" border="2px dashed white" @click="addText('正文', 13)">正文</Box>
    </Box>
  </Panel>
</template>