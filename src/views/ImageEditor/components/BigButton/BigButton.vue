<script setup>
import { computed } from 'vue'
import Box from '@/fower/Box.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'normal',
  },
})

const bgColor = computed(() => {
  if (props.type === 'primary') {
    return '#00a3da'
  } else {
    return '#3f4246'
  }
})
</script>

<template>
  <Box
    h7
    textXS
    px-20
    py-12
    toCenter
    cursorPointer
    rounded
    white
    :shadowBlue--hover="props.type === 'primary'"
    :shadowGray--hover="props.type !== 'primary'"
    :style="{ backgroundColor: bgColor }"
  >
    <slot></slot>
  </Box>
</template>
