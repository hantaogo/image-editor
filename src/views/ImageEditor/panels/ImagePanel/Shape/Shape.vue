<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import { fower } from '@/fower/fower'
import PropBlock from '@/views/ImageEditor/components/PropBlock'
import ScrollLayer from '@/components/ScrollLayer'
import Slider from '@/views/ImageEditor/components/Slider'

const canvas = inject('canvas')

const svgNames = ['question', 'star', 'heart', 'fu', 'smile', 'buding', 'shi', 'four', 'tree', 'citie', 'dog', 'disable', 'taijie', 'leaf', 'cloud']

let target = null

const svgItems = ref([])

const clipPath = ref(null)
const enable = ref(false)
const offsetX = ref('')
const offsetY = ref('')
const scale = ref('')

let originLeft = 0
let originTop = 0
let originHeight = 0

onMounted(() => {
  sharedEventHub.on('selectionChanged', onSelectionChanged)
  loadSvgs()
})

const loadSvgs = async () => {
  const items = []
  for (const svgName of svgNames) {
    const item = await loadSvg(svgName)
    items.push(item)
  }
  svgItems.value = items
}

const loadSvg = async svgName => {
  return new Promise(resolve => {
    fabric.loadSVGFromURL(`./assets/shapes/${svgName}.svg`, (objects, options) => {
      const obj = fabric.util.groupSVGElements(objects, options)
      obj.clipPathName = svgName
      resolve(obj)
    })
  })
}

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Image) {
    target = pTarget
    clipPath.value = target.clipPath || null
    enable.value = clipPath.value ? true : false
    offsetX.value = '0'
    offsetY.value = '0'
    scale.value = '1'
  } else {
    target = null
    clipPath.value = null
    enable.value = false
    offsetX.value = ''
    offsetY.value = ''
    scale.value = ''
  }
}

const onEnableChange = val => {
  if (!val) {
    clipPath.value = null
    target.clipPath = clipPath.value
    target.dirty = true
    canvas().requestRenderAll()
  }
}

const onClick = item => {
  const scale = target.height / item.height
  item.scaleToHeight(target.height)
  item.left = -item.width * 0.5 * scale
  item.top = -target.height * 0.5
  target.clipPath = item
  target.clipPathName = item.clipPathName
  target.dirty = true
  originLeft = item.left
  originTop = item.top
  originHeight = target.height
  canvas().requestRenderAll()
}

const onOffsetXChange = val => {
  offsetX.value = val
  target.clipPath.left = originLeft + parseFloat(offsetX.value) * target.width
  target.dirty = true
  canvas().requestRenderAll()
}

const onOffsetYChange = val => {
  offsetY.value = val
  target.clipPath.top = originTop + parseFloat(offsetY.value) * target.height
  target.dirty = true
  canvas().requestRenderAll()
}

const onScaleChange = val => {
  scale.value = val
  target.clipPath.scaleToHeight(originHeight * parseFloat(scale.value))
  target.dirty = true
  canvas().requestRenderAll()
}
</script>

<template>
  <PropBlock v-model="enable" @change="onEnableChange" label="形状">
    <Box flex1>
      <Box h="150" relative p2 white>
        <ScrollLayer hideX>
          <div :class="fower`grid gridTemplateColumns-4 gap-8`">
            <Box v-for="item of svgItems" :key="item.clipPathId">
              <Box bgGray700 bgGray600--hover @click="() => onClick(item)">
                <img width="40" :src="`./assets/shapes/${item.clipPathName}.svg`"/>
              </Box>
            </Box>
          </div>
        </ScrollLayer>
      </Box>
    </Box>
    <Box spaceY1>
      <Box>横向偏移</Box>
      <Slider :value="offsetX" min="-2" max="2" step="0.01" @change="val => onOffsetXChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>纵向偏移</Box>
      <Slider :value="offsetY" min="-1.2" max="1.2" step="0.01" @change="val => onOffsetYChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>缩放比例</Box>
      <Slider :value="scale" min="0.1" max="10" step="0.01" @change="val => onScaleChange(val)"/>
    </Box>
  </PropBlock>
</template>