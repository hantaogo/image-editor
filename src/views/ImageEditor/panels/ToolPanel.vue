<script setup>
import { inject } from 'vue'
import Panel from '../components/Panel'
import ToolButton from '../components/ToolButton'
import { sharedEventHub } from '@/utils/eventhub'
import Box from '@/fower/Box.vue'

const goto = inject('goto')
const emit = sharedEventHub.emit
</script>

<template>
  <!-- <Panel width="44" titleIcon="home" titleTooltip="切换首页" tooltipAlign="top" @clickTitle="() => goto('Home')"> -->
  <Panel width="44" titleTooltip="切换首页" tooltipAlign="top" @clickTitle="() => goto('Home')">
    <Box column spaceY1>
      <ToolButton icon="arrange-alternative" tooltip="检视" @click="emit('switchTool', 'InspectorPanel')"/>
      <ToolButton icon="layout" tooltip="布局" @click="emit('switchTool', 'LayoutPanel')"/>
      <ToolButton icon="add-image" tooltip="图像" @click="emit('switchTool', 'AddImagePanel')"/>
      <ToolButton icon="add-text" tooltip="文字" @click="emit('switchTool', 'AddTextPanel')"/>
      <!-- <ToolButton icon="reform" tooltip="裁剪" @click="emit('switchTool', 'ReformPanel')"/> -->
    </Box>
  </Panel>
</template>