<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Box from '@/fower/Box.vue'
import { fower } from '@/fower/fower'
import SvgIcon from '@/components/SvgIcon'
import Divider from '../Divider'
import { dragit } from '@/utils/dragit'
import BigButton from '../BigButton'
import ScrollLayer from '@/components/ScrollLayer'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  okLabel: {
    type: String,
    default: '确认'
  },
  cancelLabel: {
    type: String,
    default: '取消'
  },
  left: {
    type: String,
    default: '50%',
  },
  top: {
    type: String,
    default: '20%',
  },
  transform: {
    type: String,
    default: 'translateX(-50%)',
  },
  width: {
    type: String,
    default: '400px',
  },
  height: {
    type: String,
    default: '300px',
  },
  background: {
    type: Boolean,
    default: true,
  },
  borderRadius: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['ok', 'close'])

const target = ref(null)
const handle = ref(null)

let dragitInstanse = null

onMounted(() => {
  dragitInstanse = dragit({ target: target.value, handle: handle.value })
})

onBeforeUnmount(() => {
  dragitInstanse.destroy()
})
</script>

<template>
  <Box
    v-if="props.background"
    fixed
    zIndex-100
    left0
    top0
    bgBlack--T50
    w="100%"
    h="100%"
    @click.stop
  ></Box>
  <div
    ref="target"
    :class="fower`fixed zIndex-101 h-100`"
    :style="{ left: props.left, top: props.top, transform: props.transform, width: props.width, height: props.height, backgroundColor: '#292c31', borderRadius: props.borderRadius }"
  >
    <Box relative h="100%" column toBetween>
      <Box flexNone>
        <div ref="handle" :class="fower`h-42 toCenter p4`">
          <Box white fontBold gray300 textSM>
            <span class="disable-select">{{ props.title }}</span>
          </Box>
        </div>
        <Box absolute right3 top3 cursorPointer @click="emit('close')">
          <SvgIcon name="close" :class="fower`square3`" />
        </Box>
        <Divider />
        <slot name="toolbar">
        </slot>
      </Box>
      <Box flex1>
        <Box h="100%" relative p2 white>
          <ScrollLayer>
            <slot></slot>
          </ScrollLayer>
        </Box>
      </Box>
      <Box flexNone>
        <slot name="footer">
          <Box p4 flex1 row spaceX2>
            <BigButton flex1 @click="emit('close')">{{ props.cancelLabel }}</BigButton>
            <BigButton flex1 type="primary" @click="emit('ok')">{{ props.okLabel }}</BigButton>
          </Box>
        </slot>
      </Box>
    </Box>
  </div>
</template>

<style scoped>
.disable-select {
  cursor: default;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>