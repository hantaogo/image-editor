<script setup>
import { routes } from '@/routes'
import { ref, provide } from 'vue'

const props = defineProps({
  defaultRoute: {
    type: String,
    default: ''
  }
})

const defaultRoute = routes.find(t => t.name === props.defaultRoute)
const currentRoute = ref(defaultRoute || null)

provide('goto', name => {
  const route = routes.find(t => t.name === name)
  if (route) {
    currentRoute.value = route
  }
})
</script>

<template>
  <div v-if="currentRoute" style="width: 100%; height: 100%">
    <component :is="currentRoute.component"/>
  </div>
</template>
