<script setup>
import Box from '@/fower/Box.vue'
import { fower } from '@/fower/fower'
import SvgIcon from '@/components/SvgIcon'
import Divider from '../Divider'
import ToolButton from '../ToolButton'
import ScrollLayer from '@/components/ScrollLayer'

const emit = defineEmits(['clickTitle', 'close', 'scrollToEnd'])

const onScrollToEnd = () => {
  emit('scrollToEnd')
}

const props = defineProps({
  width: {
    type: String,
    default: '200'
  },
  height: {
    type: String,
    default: '100%'
  },
  title: {
    type: String,
    default: ''
  },
  titleIcon: {
    type: String,
    default: ''
  },
  titleIconSize: {
    type: String,
    default: '24'
  },
  titleTooltip: {
    type: String,
    default: ''
  },
  titleClickable: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  scroll: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <Box column relative :w="props.width" :h="props.height" style="background-color: #292c31;">
    <Box flexNone h-42 toCenter>
      <ToolButton v-if="titleIcon" :icon="props.titleIcon" :iconSize="titleIconSize" :tooltip="props.titleTooltip" @click="titleClickable ? emit('clickTitle') : undefined"/>
      <Box v-if="title" white fontBold gray300 textSM :cursorPointer="titleClickable" @click="titleClickable ? emit('clickTitle') : undefined">
        {{ props.title }}
      </Box>
    </Box>
    <Divider/>
    <slot name="toolbar"></slot>
    <Box mt2 flex1 relative data-content>
      <ScrollLayer v-if="props.scroll" hideX @scrollToEnd="onScrollToEnd">
        <slot></slot>
      </ScrollLayer>
      <slot v-else></slot>
    </Box>
    <Box flexNone>
      <slot name="footer">
      </slot>
    </Box>
    <Box flexNone absolute right3 cursorPointer @click="emit('close')">
      <SvgIcon v-if="closable" name="close" :class="fower`square3`"/>
    </Box>
  </Box>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.inner {
  height: 0;
}
</style>
