<script setup>
import Box from '@/fower/Box.vue'
import SvgIcon from '@/components/SvgIcon'

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#fff',
  },
  size: {
    type: String,
    default: '20px',
  },
  width: {
    type: String,
    default: '32',
  },
  height: {
    type: String,
    default: '32',
  },
  highlight: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
  <Box
    textXS
    fontBold
    toCenter
    cursorPointer
    rounded
    bgGray700
    bgGray600--hover
    :w="props.width"
    :h="props.height"
    :class="props.highlight ? 'highlight' : undefined"
  >
    <SvgIcon :name="props.icon" :color="props.color" :style="{ width: props.size, height: props.size }"/>
  </Box>
</template>

<style scoped>
.highlight {
  box-shadow: 0px 2px 0px 0px #0099cc;
}
</style>
