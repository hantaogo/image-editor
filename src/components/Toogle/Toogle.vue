<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#72d09c'
  },
  size: {
    type: Number,
    default: 16
  },
  borderSize: {
    type: Number,
    default: 1
  },
  shadowSize: {
    type: Number,
    default: 2
  },
})

const toogle = ref(null)
const width = ref(props.size * 2)
const state = ref(props.modelValue)
const position = ref(0)

const toogleStyle = computed(() => {
  return {
    width: `${props.size * 2}px`,
    height: `${props.size}px`,
    padding: `${props.borderSize}px`,
    border: `${props.borderSize}px solid #ddd`,
    borderRadius: `${props.size}px`,
    background: state.value ? props.color : undefined,
  }
})

const handleStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    transform: `translateX(${position.value / width.value * 100}%)`,
  }
})

const stateClass = computed(() => {
  if (state.value) {
    return 'active'
  }
})

watch(() => props.modelValue, () => {
  state.value = props.modelValue
  position.value = !props.modelValue ? 0 : props.size * 2
})

onMounted(() => {
  state.value = props.modelValue
  toggle(state.value)
})

const onClick = () => {
  toggle(!state.value)
  emitIt()
}

const toggle = stat => {
  state.value = stat
  position.value = !stat ? 0 : props.size * 2
}

const emitIt = () => {
  emit('update:modelValue', state.value)
  emit('change', state.value)
}

</script>

<template>
  <div ref="toogle" class="toggle" :class="[stateClass]" @click.stop="onClick" :style="toogleStyle">
    <div class="draggable" :style="handleStyle"></div>
  </div>
</template>

<style scoped>
.toggle {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  background: #fff;
  transition: background 0.6s;
}

.draggable {
  background: #fff;
  border-radius: 100%;
  box-shadow: 0px 3px 10px rgba(0,0,0, 0.6);
  transform: translateX(0%);
  transition: transform 0.05s ease-in-out;
}

.active {
  transition: background 0.6s;
}
</style>