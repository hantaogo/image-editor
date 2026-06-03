<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import autosize from 'autosize'
import Box from '@/fower/Box.vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['change'])

const textarea = ref(null)

onMounted(() => {
  autosize(textarea.value)
})

onBeforeUnmount(() => {
  autosize.destroy(textarea.value)
})

const onChange = val => {
  autosize.update(textarea.value)
  emit('change', val)
}
</script>

<template>
  <Box>
    <textarea class="textarea" ref="textarea" :value="props.value" @input="e => onChange(e.target.value)"/>
  </Box>
</template>

<style lang="less" scoped>
.textarea {
  max-width: 100%;
  min-width: 100%;
  padding: 2px 4px;
  text-align: left;
  color: #fff;
  background-color: #25282c;
  border: 2px solid #424549;
  border-radius: 2px;
  transition: all .15s linear;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  
  &:hover {
    border: 2px solid #afafaf;
  }

  &:focus {
    outline:none;
    border: 2px solid #00a3da;
  }
}
</style>