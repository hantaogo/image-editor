<script setup>
import { ref } from 'vue'
import Box from '@/fower/Box.vue'
import { fower } from '@/fower/fower'
import SvgIcon from '@/components/SvgIcon'

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: String,
    default: '24',
  },
  tooltip: {
    type: String,
    default: '',
  },
  tooltipAlign: {
    type: String,
    default: 'center',
  },
})

const emit = defineEmits(['click'])

const showTooltip = ref(false)

const onMouseOver = () => {
  showTooltip.value = true
}

const onMouseLeave = () => {
  showTooltip.value = false
}
</script>

<template>
  <Box relative w-44 h-44>
    <Box w-60 h-44 absolute left0 top0 zIndex-1 pl-44 :style="{ backgroundColor: showTooltip ? '#0096c8' : undefined }">
      <Box w-44 h-44 absolute left0 top0 zIndex-2 toCenter cursorPointer @mouseover="onMouseOver" @mouseleave="onMouseLeave" @click="emit('click')">
        <SvgIcon :name="props.icon" :class="fower`square-${props.iconSize}`"/>
      </Box>
      <template v-if="tooltipAlign === 'top'">
        <Box flex1 h-40 toRgihtX toTop v-if="showTooltip">
          <Box white textSM>
            {{ props.tooltip }}
          </Box>
        </Box>
      </template>
      <template v-if="tooltipAlign === 'bottom'">
        <Box flex1 h-40 toRgihtX toBottom v-if="showTooltip">
          <Box white textSM>
            {{ props.tooltip }}
          </Box>
        </Box>
      </template>
      <template v-else>
        <Box flex1 h-40 toRgihtX toCenterY v-if="showTooltip">
          <Box white textSM>
            {{ props.tooltip }}
          </Box>
        </Box>
      </template>
    </Box>
  </Box>
</template>
