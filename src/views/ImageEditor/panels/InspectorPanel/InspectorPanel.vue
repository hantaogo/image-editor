<script setup>
import { onMounted, onUnmounted } from 'vue'
import Panel from '../../components/Panel'
import Box from '@/fower/Box.vue';

onMounted(() => {
})

onUnmounted(() => {
})
</script>

<template>
  <Panel width="260" title="检视">
    <Box h="200" toCenter white textSM>请先选择要查看对象</Box>
  </Panel>
</template>