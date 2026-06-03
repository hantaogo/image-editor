<script setup>
import { sharedEventHub } from '@/utils/eventhub'
import { ref, onMounted, onUnmounted } from 'vue'
import Box from '@/fower/Box.vue'
import InspectorPanel from '../panels/InspectorPanel'
import TextPanel from '../panels/TextPanel'
import ImagePanel from '../panels/ImagePanel'
import LayoutPanel from '../panels/LayoutPanel'
import AddImagePanel from '../panels/AddImagePanel'
import AddTextPanel from '../panels/AddTextPanel'
import ReformPanel from '../panels/ReformPanel'

const componentName = ref('')

let selection = null

onMounted(() => {
  sharedEventHub.on('switchTool', onSwitchTool)
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('switchTool', onSwitchTool)
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSwitchTool = name => {
  if (componentName.value === name) {
      componentName.value = ''
  } else if (name === 'InspectorPanel') {
    updateInspectorPanelName()
  } else {
    componentName.value = name
  }
}

const onSelectionChanged = target => {
  selection = target
  updateInspectorPanelName()
}

const updateInspectorPanelName = () => {
  if (selection instanceof fabric.Textbox) {
    componentName.value = 'TextPanel'
  } else if (selection instanceof fabric.Image) {
    componentName.value = 'ImagePanel'
  } else {
    componentName.value = 'InspectorPanel'
  }
}
</script>

<template>
  <Box flexNone relative v-show="componentName">
    <InspectorPanel v-show="componentName === 'InspectorPanel'"/>
    <TextPanel v-show="componentName === 'TextPanel'"/>
    <ImagePanel v-show="componentName === 'ImagePanel'"/>
    <LayoutPanel v-show="componentName === 'LayoutPanel'"/>
    <AddImagePanel v-show="componentName === 'AddImagePanel'"/>
    <AddTextPanel v-show="componentName === 'AddTextPanel'"/>
    <ReformPanel v-show="componentName === 'ReformPanel'"/>
  </Box>
</template>