<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Box from '@/fower/Box.vue'
import { sharedEventHub } from '@/utils/eventhub'
import RadarPanel from '../panels/RadarPanel'
import LayerPanel from '../panels/LayerPanel'
import HistoryPanel from '../panels/HistoryPanel'

const visible = ref(false)

onMounted(() => {
  sharedEventHub.on('switchRight', onSwitchRight)
})
onUnmounted(() => {
  sharedEventHub.off('switchRight', onSwitchRight)
})
const onSwitchRight = () => {
  visible.value = !visible.value
}
</script>

<template>
  <Box v-show="visible" w="110" style="background-color: #292c31;" white>
    <!-- <Box column toBetween> -->
      <!-- <RadarPanel/> -->
      <!-- <HistoryPanel/> -->
    <!-- </Box> -->
    <LayerPanel/>
  </Box>
</template>