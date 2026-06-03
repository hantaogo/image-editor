<script setup>
import { ref, watch } from 'vue'
import Box from '@/fower/Box.vue'

const emit = defineEmits(['change'])

const props = defineProps({
  modelValue: {
    type: String,
    default: '1',
  },
  tabs: {
    type: String,
    default: '1,2,3',
  },
})

const current = ref(props.modelValue)

const tabs = ref(props.tabs ? props.tabs.split(',') : '')

watch(() => props.modelValue, () => {
  current.value = props.modelValue
})

const onClick = tab => {
  current.value = tab
  emit('update:modelValue', tab)
  emit('change', tab)
}
</script>

<template>
  <Box row toBottom px4>
    <Box flex1 v-for="(tab, index) of tabs" :key="tab">
      <Box
        h-28
        bgGray700
        bgGray700--L10--hover
        :style="{
          borderRadius: index === 0 ? '5px 0 0 0' : (index === tabs.length - 1 ? '0 5px 0 0' : '0'),
          borderBottom: current === tab ? '2px solid #0099cc' : undefined,
        }"
        cursorPointer
        white
        textXS
        toCenter
        @click="() => onClick(tab)"
      >
        {{ tab }}
      </Box>
    </Box>
  </Box>
</template>