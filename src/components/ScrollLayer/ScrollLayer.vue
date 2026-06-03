<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SimpleBar from 'simplebar'
import 'simplebar/dist/simplebar.css'

const emit = defineEmits(['scrollToEnd'])

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    },
  },
  hideX: {
    type: Boolean,
    default: false,
  },
  hideY: {
    type: Boolean,
    default: false,
  },
})

const container = ref(null)

let bar = null

onMounted(() => {
  bar = new SimpleBar(container.value, props.options)
  bar.getScrollElement().addEventListener('scroll', onScroll, { passive: true });
})

onUnmounted(() => {
  bar.getScrollElement().removeEventListener('scroll', onScroll)
  bar = null
})

const onScroll = e => {
  const { scrollHeight, scrollTop, clientHeight } = e.target
  const dy = scrollHeight - Math.round(scrollTop) - clientHeight
  if (dy <= 1) {
    emit('scrollToEnd')
  }
}
</script>

<template>
  <div class="scroll-layer">
    <div ref="container" class="container" :style="{ overflowX: props.hideX ? 'hidden' : undefined, overflowY: props.hideY ? 'hidden' : undefined }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.scroll-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

:deep(.simplebar-scrollbar:before) {
  background-color: #8b8c8d;
}
</style>