<script setup>
import Box from '@/fower/Box.vue'
import { fower } from '@/fower/fower'
import SvgIcon from '@/components/SvgIcon'

const props = defineProps({
  icon: {
    type: String,
    default: 'icon',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
  <Box
    h7
    textXS
    fontBold
    toCenter
    cursorPointer
    rounded
    :white="!props.disabled"
    :gray200="props.disabled"
  >
    <Box spaceX2 toTop>
      <Box v-if="props.icon">
        <SvgIcon :name="props.icon" :color="props.disabled ? '#b2b3b5' : '#fff'" :class="fower`square4`"/>
      </Box>
      <Box :style="{ color: props.disabled ? '#b2b3b5' : '#fff' }">
        <slot></slot>
      </Box>
    </Box>
  </Box>
</template>
