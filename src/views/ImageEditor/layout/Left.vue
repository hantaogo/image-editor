<script setup>
import Box from '@/fower/Box.vue'
import ToolPanel from '../panels/ToolPanel.vue'
import ToolPanelContainer from './ToolPanelContainer.vue'
import Center from './Center.vue'
import Bottom from './Bottom.vue'

</script>

<template>
  <Box flex1 column toBetween spaceY-2>
    <Box flex1 row spaceX-2>
      <ToolPanel/>
      <ToolPanelContainer/>
      <Center/>
    </Box>
    <Bottom/>
  </Box>
</template>