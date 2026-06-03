<script setup>
import { ref } from 'vue'
import Box from '@/fower/Box.vue'
import Modal from '../Modal'

const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  cancelLabel: {
    type: String,
    default: '取消',
  },
  okLabel: {
    type: String,
    default: '确认',
  },
  width: {
    type: String,
    default: '400px',
  },
  height: {
    type: String,
    default: '300px',
  },
})

const emit = defineEmits(['ok', 'cancel'])

const visible = ref(false)

const open = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
  emit('cancel')
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Modal v-if="visible" :title="props.title" :width="props.width" :height="props.height" borderRadius="4px" @close="close" @ok="emit('ok')">
    <Box column>
      <Box relative>
        <slot></slot>
      </Box>
    </Box>
  </Modal>
</template>