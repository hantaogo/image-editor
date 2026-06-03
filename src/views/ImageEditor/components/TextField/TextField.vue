<script setup>
import { ref, watch } from 'vue'
import Box from '@/fower/Box.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  textAlign: {
    type: String,
    default: 'left'
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'string'
  },
  min: {
    type: String,
    default: ''
  },
  max: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['update:modelValue', 'input', 'change', 'blur'])

const text = ref(props.type === 'number' ? `${parseFloat(props.modelValue) || 0}` : props.modelValue )

const input = ref(null)

watch(() => props.modelValue, () => {
  text.value = props.modelValue
})

const onInput = e => {
  const v = `${e.target.value}`
  emit('update:modelValue', v)
  emit('input', v)
}

const onChange = e => {
  const val = updateValue(e)
  emit('change', val)
}

const onBlur = e => {
  const val = updateValue(e)
  emit('blur', val)
}

const updateValue = e => {
  let val = ''
  if (props.type === 'number') {
    val = parseFloat(e.target.value) || 0
    const min = parseFloat(props.min)
    const max = parseFloat(props.max)
    if (min) {
      val = Math.max(val, min)
    }
    if (max) {
      val = Math.min(val, max)
    }
  } else {
    val = e.target.value
  }
  const v = `${val}`
  emit('update:modelValue', v)
  return v
}
</script>

<template>
  <Box>
    <input
      ref="input"
      :class="props.readonly ? 'readonly' : 'default'"
      :style="{ textAlign: props.textAlign }"
      :readonly="props.readonly"
      :placeholder="props.placeholder"
      v-model="text"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    />
  </Box>
</template>

<style lang="less" scoped>
.default {
  width: 100%;
  height: 100%;
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
.readonly {
  width: 100%;
  height: 100%;
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
    border: 2px solid #afafaf;
  }
}
</style>