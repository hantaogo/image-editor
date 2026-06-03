<script setup>
import Box from '@/fower/Box.vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  min: {
    type: String,
    default: '1'
  },
  max: {
    type: String,
    default: '100'
  },
  step: {
    type: String,
    default: '1'
  },
})

const emit = defineEmits(['change'])

const onInput = val => {
  emit('change', val)
}
</script>

<template>
  <Box h6>
    <input
      type="range"
      class="default"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :value="props.value"
      @input="e => onInput(e.target.value)"
    />
  </Box>
</template>

<style lang="less" scoped>
.default {
  width: 100%;
  height: 100%;
}

input[type="range"] {
  -webkit-appearance: none;
  background-color: #494b50;
  width: 100%;
  height: 2px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: #0099cc;
  width: 14px;
  height: 14px;
  border: 2px #0099cc solid;
  border-radius: 100%;

  &:hover {
    background-color: #494b50;
  }
}
</style>