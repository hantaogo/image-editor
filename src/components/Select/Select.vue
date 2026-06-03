<script setup>
import { ref, watch } from 'vue'
import Box from '@/fower/Box.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default() {
      return []
    },
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const value = ref(props.modelValue )

watch(() => props.modelValue, () => {
  value.value = props.modelValue
})

const onChange = e => {
  const val = e.target.value
  value.value = val
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <Box>
    <select
      class="select"
      v-model="value"
      @change="onChange"
    >
      <slot>
        <option v-for="op of props.options" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </slot>
    </select>
  </Box>
</template>

<style lang="less" scoped>
.select {
  width: 100%;
  height: 100%;
  font-size: 12px;
  padding: 2px 4px;
  color: #fff;
  background-color: #25282c;
  border: 2px solid #424549;
  border-radius: 2px;
  transition: all 0.15s linear;

  &:hover {
    border: 2px solid #afafaf;
  }

  &:focus {
    outline: none;
    border: 2px solid #00a3da;
  }
}
</style>