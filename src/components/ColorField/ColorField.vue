<script setup>
import { ref, watchEffect } from 'vue'
import Box from '@/fower/Box.vue'
import ColorPicker from '@/components/ColorPicker'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: {
    type: String,
    default: '#ffffffff'
  },
  label: {
    type: String,
    default: '颜色'
  },
  width: {
    type: Number,
    default: 228,
  },
  height: {
    type: Number,
    default: 175,
  },
})

const visible = ref(false)

const color = ref(props.modelValue)

const onColorChange = val => {
  emit('update:modelValue', val)
  emit('change', val)
  color.value = val
}

watchEffect(() => {
  color.value = props.modelValue
})
</script>

<template>
  <Box spaceY1>
    <Box row toBetween>
      <Box white textXS>{{ props.label }}</Box>
      <Box w-60 h5 cursorPointer rounded :style="{ border: '2px solid #777', backgroundColor: color }" @click="visible=!visible"></Box>
    </Box>
    <ColorPicker v-show="visible" :color="color" :width="props.width" :height="props.height" @change="onColorChange"/>
  </Box>
</template>

<style>
</style>