<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import { css } from '@fower/core'

const build = function(el) {
  const props = []
  const obj = {}
  let oldClass = ''
  Array.from(el.attributes).map(attr => {
    const name = attr.name
    const value = attr.value
    if (name.startsWith('data-v') || name === 'style') {
      return
    }
    if (name === 'class') {
      oldClass = value
    }
    if (value === '' || value === true || value === 'true') {
      props.push(name)
    } else if (value !== 'false') {
      obj[name] = value
    }
  })
  const classNames = css(props, obj)
  const className = oldClass ? `${oldClass} ${classNames}` : classNames
  if (className) {
    el.className = className
  }
}

const box = ref(null)

onMounted(() => {
  build(box.value)
})
onUpdated(() => {
  build(box.value)
})
</script>

<template>
  <div ref="box">
    <slot></slot>
  </div>
</template>