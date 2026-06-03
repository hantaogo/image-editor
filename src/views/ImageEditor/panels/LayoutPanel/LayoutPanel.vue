<script setup>
import Panel from '../../components/Panel'
import BigButton from '../../components/BigButton'
import Box from '@/fower/Box.vue'
import { sharedEventHub } from '@/utils/eventhub'
import BackgroundSetting from './BackgroundSetting/BackgroundSetting.vue'
const emit = sharedEventHub.emit
</script>

<template>
  <Panel width="260" title="布局">
    <Box p4 spaceY6>
      <!-- <BigButton @click="emit('setImageSize')">调整图片大小</BigButton> -->
      <BigButton @click="emit('setCanvasSize')">调整画布大小</BigButton>
      <BackgroundSetting/>
    </Box>
  </Panel>
</template>