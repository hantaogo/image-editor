<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Panel from '../../components/Panel'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import Remove from './Remove'
import Clone from './Clone'
import Color from './Color'
import Shape from './Shape'
import Stroke from './Stroke'
import Shadow from './Shadow'

const target = ref(null)

onMounted(() => {
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Image) {
    target.value = pTarget
  } else {
    target.value = null
  }
}
</script>

<template>
  <Panel width="260" title="图像">
    <Box h="100%" white textXS>
      <Box column spaceY3 p4>
        <Remove/>
        <Clone/>
        <Color/>
        <Shape/>
        <Stroke/>
        <Shadow/>
      </Box>
    </Box>
  </Panel>
</template>