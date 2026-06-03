<script setup>
import { ref } from "vue"
import Box from "./Box.vue";
const btn = ref(true)
const color = ref('#fff')
const otherColor = ref('#000')
</script>

<template>
  <div>
    <Box square-200 bgBlue400 toCenter borderBlue700 row bgBlue400--L10--hover my4>方形</Box>
    <Box :btn="btn" huge>文字</Box>
    <Box square-100 bgGreen400 cursorPointer toCenter textXS @click="() => btn = !btn">点击切换样式</Box>
    <Box circle20 bgRed600 toCenter :color="btn ? color : otherColor">表达式</Box>
  </div>
</template>