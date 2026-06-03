<script setup>
import Box from '@/fower/Box.vue'
import { fower } from '@/fower/fower'
import SvgIcon from '@/components/SvgIcon'
import BigButton from '../components/BigButton'
import TextButton from '../components/TextButton'
import ToolButton from '../components/ToolButton'
import { sharedEventHub } from '@/utils/eventhub'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = sharedEventHub.emit

const fullscreen = ref(false)

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullScreenChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', onFullScreenChange)
})

const onFullScreenChange = () => {
  if (document.fullscreenElement) {
    fullscreen.value = true
  } else {
    fullscreen.value = false
  }
}
</script>

<template>
  <Box flexNone h="44" style="background-color: #292c31;" toBetween>
    <ToolButton style="visibility: hidden" icon="settings" tooltip="选项" @click="emit('settings')"/>
    <Box white toCenter textXS gray200>拖动画布：Alt + 鼠标左键，缩放画布：Alt + 鼠标滚轮</Box>
    <Box toCenterY toRight spaceX8 mr2>
      <Box row spaceX3>
        <TextButton style="visibility: hidden" w-60 icon="undo-small" disabled @click="!disabled ? emit('undo') : undefined">撤销</TextButton>
        <TextButton style="visibility: hidden" w-60 icon="redo-small" disabled @click="!disabled ? emit('redo') : undefined">重做</TextButton>
      </Box>
      <Box row spaceX3>
        <BigButton style="visibility: hidden" w-100 fontBold @click="emit('close')">关闭</BigButton>
        <BigButton w-100 fontBold type="primary" @click="emit('save')">储存</BigButton>
      </Box>
      <Box row spaceX3>
        <ToolButton v-if="fullscreen" icon="exit-fullscreen" tooltip="退出全屏" tooltipAlign="bottom" @click="emit('fullscreen')"/>
        <ToolButton v-else icon="request-fullscreen" tooltip="全屏" @click="emit('fullscreen')"/>
      </Box>
      <Box row spaceX3>
        <Box cursorPointer @click="emit('switchRight')"><SvgIcon name="drawer" :class="fower`square6`"/></Box>
      </Box>
    </Box>
  </Box>
</template>