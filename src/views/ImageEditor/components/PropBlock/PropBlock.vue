<script setup>
import { ref, watch } from 'vue'
import Box from '@/fower/Box.vue'
import Toggle from '@/components/Toogle'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '属性块',
  },
})

const enable = ref(false)

watch(() => props.modelValue, () => {
  enable.value = props.modelValue
})

const onEnableChange = () => {
  console.log('PropBlock.onEnableChange', enable.value)
  emit('update:modelValue', enable.value)
  emit('change', enable.value)
}

const onClick = () => {
  enable.value = !enable.value
  onEnableChange()
}
</script>

<template>
  <Box column spaceY4>
    <Box h8 toCenter p2 relative bgGray700 bgGray600--hover :class="enable ? 'highlight-left-border' : undefined" @click="onClick">
      <Box row toBetween w="100%">
        <Box><span :class="['arraw', enable ? 'rotate' : 'normal']"></span><span style="margin-left: 20px;">{{ props.label }}</span></Box>
        <Toggle v-model="enable" @change="onEnableChange" color="#292c31"/>
      </Box>
    </Box>
    <Box v-show="enable" column spaceY4>
      <slot></slot>
    </Box>
  </Box>
</template>

<style scoped>
.arraw {
  border: solid hsla(0, 0%, 100%, 0.6);
  border-width: 0 0 3px 3px;
  display: block;
  height: 8px;
  left: 10px;
  transform: rotate(-45deg);
  position: absolute;
  transition: all .15s linear;
  transform-origin: center;
  width: 8px;
}
.normal {
  top: 11px;
  transform: rotate(-135deg);
}
.rotate {
  top: 9px;
  transform: rotate(-45deg);
}
.highlight-left-border {
  box-shadow: -5px 0px 0px 0px #0099cc;
}
</style>