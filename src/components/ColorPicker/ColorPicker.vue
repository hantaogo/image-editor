<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ColorPicker from 'simple-color-picker';

const container = ref(null)

const props = defineProps({
  color: {
    type: String,
    default: '#ffffffff'
  },
  width: {
    type: Number,
    default: 175,
  },
  height: {
    type: Number,
    default: 150,
  },
})

const emit = defineEmits(['change'])

let colorPicker = null
let firstTime = true

onMounted(() => {
  colorPicker = new ColorPicker({
    el: container.value,
    width: props.width,
    height: props.height,
    color: props.color,
  })
  firstTime = true
  colorPicker.onChange(onColorChange)
})

onBeforeUnmount(() => {
  colorPicker = null
})

const onColorChange = color => {
  if (firstTime) {
    firstTime = false
    return
  }
  emit('change', color)
}
</script>

<template>
  <div ref="container" class="container"></div>
</template>

<style scoped>
:deep(.Scp-sbSelector) {
  z-index: 1;
}
</style>