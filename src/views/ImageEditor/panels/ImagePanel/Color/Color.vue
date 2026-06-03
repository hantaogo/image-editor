<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { sharedEventHub } from '@/utils/eventhub'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import Slider from '../../../components/Slider'
import PropBlock from '@/views/ImageEditor/components/PropBlock'
import Toogle from '@/components/Toogle'
import Select from '@/components/Select'
import ColorField from '@/components/ColorField/ColorField.vue'

const canvas = inject('canvas')

let target = null
let lastTarget = null

const enable = ref(false)
const hue = ref('')
const brightness = ref('')
const contrast = ref('')
const saturation = ref('')
const vibrance = ref('')
const noise = ref('')
const pixelate = ref('')
const blur = ref('')
const gammaRed = ref('')
const gammaGreen = ref('')
const gammaBlue = ref('')
const blendColor = ref(false)
const blendColorMode = ref('')
const blendColorColor = ref('')
const blendColorAlpha = ref('')
const blendColorOptions = [
  { value: 'add', label: '叠加' },
  { value: 'diff', label: '取反' },
  { value: 'subtract', label: '减' },
  { value: 'multiply', label: '乘' },
  { value: 'screen', label: '过滤' },
  { value: 'lighten', label: '亮' },
  { value: 'darken', label: '暗' },
  { value: 'overlay', label: '覆盖' },
  { value: 'exclusion', label: '排除' },
  { value: 'tint', label: '染色' },
]
const blendImage = ref(false)
const blendImageMode = ref('')
const blendImageAlpha = ref('')
const blendImageOptions = [
  { value: 'multiply', label: '混合' },
  { value: 'mask', label: '蒙版' },
]
const sharpen = ref(false)
const sharpenMatrix = [
  0, -1, 0,
  -1, 5, -1,
  0, -1, 0
]
const emboss = ref(false)
const embossMatrix = [
  1, 1, 1,
  1, 0.7, -1,
  -1, -1, -1
]
const grayscale = ref(false)
const grayscaleMode = ref('')
const grayScaleOptions = [
  { value: 'average', label: '平衡' },
  { value: 'luminosity', label: '亮' },
  { value: 'lightness', label: '暗' },
]
const invert = ref(false)
const sepia = ref(false)
const blackWhite = ref(false)
const brownie = ref(false)
const vintage = ref(false)
const kodachrome = ref(false)
const technicolor = ref(false)
const polaroid = ref(false)

onMounted(() => {
  // 监听事件
  sharedEventHub.on('selectionChanged', onSelectionChanged)
})

onUnmounted(() => {
  sharedEventHub.off('selectionChanged', onSelectionChanged)
})

const onSelectionChanged = pTarget => {
  if (pTarget instanceof fabric.Image) {
    lastTarget = target
    target = pTarget
    if (target.filters.length > 0) {
      enable.value = true
      // 解析过滤器属性
      for (const filter of target.filters) {
        if (filter instanceof fabric.Image.filters.HueRotation) {
          hue.value = `${filter.rotation}`
          console.log('hue', hue.value)
        } else if (filter instanceof fabric.Image.filters.Brightness) {
          brightness.value = `${filter.brightness}`
          console.log('brightness', brightness.value)
        } else if (filter instanceof fabric.Image.filters.Contrast) {
          contrast.value = `${filter.contrast}`
          console.log('contrast', contrast.value)
        } else if (filter instanceof fabric.Image.filters.Saturation) {
          saturation.value = `${filter.saturation}`
          console.log('saturation', saturation.value)
        } else if (filter instanceof fabric.Image.filters.Vibrance) {
          vibrance.value = `${filter.vibrance}`
          console.log('vibrance', vibrance.value)
        } else if (filter instanceof fabric.Image.filters.Noise) {
          noise.value = `${filter.noise}`
          console.log('noise', noise.value)
        } else if (filter instanceof fabric.Image.filters.Pixelate) {
          pixelate.value = `${filter.blocksize}`
          console.log('pixelate', pixelate.value)
        } else if (filter instanceof fabric.Image.filters.Blur) {
          blur.value = `${filter.blur}`
          console.log('blur', blur.value)
        } else if (filter instanceof fabric.Image.filters.Gamma) {
          gammaRed.value = `${filter.gamma[0]}`
          gammaGreen.value = `${filter.gamma[1]}`
          gammaBlue.value = `${filter.gamma[2]}`
          console.log('gammaRed', gammaRed.value)
          console.log('gammaGreen', gammaGreen.value)
          console.log('gammaBlue', gammaBlue.value)
        } else if (filter instanceof fabric.Image.filters.BlendColor) {
          blendColor.value = true
          blendColorMode.value = filter.mode
          blendColorColor.value = filter.color
          blendColorAlpha.value = `${filter.alpha}`
          console.log('blendColor', blendColor.value)
          console.log('blendColorMode', blendColorMode.value)
          console.log('blendColorColor', blendColorColor.value)
          console.log('blendColorAlpha', blendColorAlpha.value)
        } else if (filter instanceof fabric.Image.filters.BlendImage) {
          blendImage.value = true
          blendImageMode.value = filter.mode
          blendImageAlpha.value = `${filter.alpha}`
          console.log('blendImage', blendImage.value)
          console.log('blendImageMode', blendImageMode.value)
          console.log('blendImageAlpha', blendImageAlpha.value)
        } else if (filter instanceof fabric.Image.filters.Convolute && JSON.stringify(filter.matrix) === JSON.stringify(sharpenMatrix)) {
          sharpen.value = true
          console.log('sharpen', sharpen.value)
        } else if (filter instanceof fabric.Image.filters.Convolute && JSON.stringify(filter.matrix) === JSON.stringify(embossMatrix)) {
          emboss.value = true
          console.log('emboss', emboss.value)
        } else if (filter instanceof fabric.Image.filters.Grayscale) {
          grayscale.value = true
          console.log('grayscale', grayscale.value)
          grayscaleMode.value = `${filter.mode}`
          console.log('grayscaleMode', grayscaleMode.value)
        } else if (filter instanceof fabric.Image.filters.Invert) {
          invert.value = true
          console.log('invert', invert.value)
        } else if (filter instanceof fabric.Image.filters.Sepia) {
          sepia.value = true
          console.log('sepia', sepia.value)
        } else if (filter instanceof fabric.Image.filters.BlackWhite) {
          blackWhite.value = true
          console.log('blackWhite', blackWhite.value)
        } else if (filter instanceof fabric.Image.filters.Brownie) {
          brownie.value = true
          console.log('brownie', brownie.value)
        } else if (filter instanceof fabric.Image.filters.Vintage) {
          vintage.value = true
          console.log('vintage', vintage.value)
        } else if (filter instanceof fabric.Image.filters.Kodachrome) {
          kodachrome.value = true
          console.log('kodachrome', kodachrome.value)
        } else if (filter instanceof fabric.Image.filters.Technicolor) {
          technicolor.value = true
          console.log('technicolor', technicolor.value)
        } else if (filter instanceof fabric.Image.filters.Polaroid) {
          polaroid.value = true
          console.log('polaroid', polaroid.value)
        }
      }
    } else {
      enable.value = false
    }
  } else {
    target = null
    enable.value = false
  }
}

const onEnableChange = val => {
  if (val) {
    hue.value = '0'
    brightness.value = '0'
    contrast.value = '0'
    saturation.value = '0'
    vibrance.value = '0'
    noise.value = '0'
    pixelate.value = '1'
    blur.value = '0'
    gammaRed.value = '1'
    gammaBlue.value = '1'
    gammaGreen.value = '1'
    blendColor.value = false
    blendColorMode.value = 'multiply'
    blendColorColor.value = '#ffffff'
    blendColorAlpha.value = '0.5'
    blendImage.value = false
    blendImageMode.value = 'multiply'
    blendImageAlpha.value = '1'
    sharpen.value = false
    emboss.value = false
    grayscale.value = false
    grayscaleMode.value = ''
    invert.value = false
    sepia.value = false
    blackWhite.value = false
    brownie.value = false
    vintage.value = false
    kodachrome.value = false
    technicolor.value = false
    polaroid.value = false
    updateColor()
  } else {
    target.filters.splice(0, target.filters.length)
    target.applyFilters()
    canvas().requestRenderAll()
  }
}

const onHueChange = val => {
  hue.value = val
  updateColor()
}

const onBrightnessChange = val => {
  brightness.value = val
  updateColor()
}

const onContrastChange = val => {
  contrast.value = val
  updateColor()
}

const onSaturationChange = val => {
  saturation.value = val
  updateColor()
}

const onVibranceChange = val => {
  vibrance.value = val
  updateColor()
}

const onNoiseChange = val => {
  noise.value = val
  updateColor()
}

const onPixelateChange = val => {
  pixelate.value = val
  updateColor()
}

const onBlurChange = val => {
  blur.value = val
  updateColor()
}

const onGammaRedChange = val => {
  gammaRed.value = val
  updateColor()
}

const onGammaGreenChange = val => {
  gammaGreen.value = val
  updateColor()
}

const onGammaBlueChange = val => {
  gammaBlue.value = val
  updateColor()
}

const onBlendColorChange = val => {
  if (val) {
    blendColorMode.value = 'multiply'
    blendColorColor.value = '#ffffff'
    blendColorAlpha.value = '0.5'
  }
  updateColor()
}

const onBlendColorModeChange = val => {
  updateColor()
}

const onBlendColorColorChange = val => {
  updateColor()
}

const onBlendColorAlphaChange = val => {
  blendColorAlpha.value = val
  updateColor()
}

const onBlendImageChange = val => {
  if (val) {
    blendImageMode.value = 'multiply'
    blendImageAlpha.value = '0.5'
  }
  updateColor()
}

const onBlendImageModeChange = val => {
  updateColor()
}

const onBlendImageAlphaChange = val => {
  blendImageAlpha.value = val
  updateColor()
}

const onSharpenChange = val => {
  updateColor()
}

const onEmbossChange = val => {
  updateColor()
}

const onGrayScaleChange = val => {
  if (val) {
    grayscaleMode.value = 'average'
  }
  updateColor()
}

const onGrayScaleModeChange = val => {
  updateColor()
}

const onInvertChange = val => {
  updateColor()
}

const onSepiaChange = val => {
  updateColor()
}

const onBlackWhiteChange = val => {
  updateColor()
}

const onBrownieChange = val => {
  updateColor()
}

const onVintageChange = val => {
  updateColor()
}

const onKodachromeChange = val => {
  updateColor()
}

const onTechnicolorChange = val => {
  updateColor()
}

const onPolaroidChange = val => {
  updateColor()
}

const updateColor = () => {
  target.filters.splice(0, target.filters.length)
  target.filters.push(
    new fabric.Image.filters.HueRotation({ rotation: parseFloat(hue.value) }),
    new fabric.Image.filters.Brightness({ brightness: parseFloat(brightness.value) }),
    new fabric.Image.filters.Contrast({ contrast: parseFloat(contrast.value) }),
    new fabric.Image.filters.Saturation({ saturation: parseFloat(saturation.value) }),
    new fabric.Image.filters.Vibrance({ vibrance: parseFloat(vibrance.value) }),
    new fabric.Image.filters.Noise({ noise: parseFloat(noise.value) }),
    new fabric.Image.filters.Pixelate({ blocksize: parseFloat(pixelate.value) }),
    new fabric.Image.filters.Blur({ blur: parseFloat(blur.value) }),
    new fabric.Image.filters.Gamma({ gamma: [parseFloat(gammaRed.value), parseFloat(gammaGreen.value), parseFloat(gammaBlue.value)] }),
  )
  
  if (blendColor.value) {
    target.filters.push(new fabric.Image.filters.BlendColor({
      mode: blendColorMode.value,
      color: blendColorColor.value,
      alpha: parseFloat(blendColorAlpha.value),
    }))
  }
  
  if (blendImage.value && lastTarget) {
    const filter = new fabric.Image.filters.BlendImage({
      image: lastTarget,
      mode: blendImageMode.value,
      alpha: parseFloat(blendImageAlpha.value)
    })
    console.log('开启混合图像', filter)
    target.filters.push(filter)
  }
  
  if (sharpen.value) {
    target.filters.push(new fabric.Image.filters.Convolute({ matrix: sharpenMatrix }))
  }
  
  if (emboss.value) {
    target.filters.push(new fabric.Image.filters.Convolute({ matrix: embossMatrix }))
  }
  
  if (grayscale.value) {
    target.filters.push(new fabric.Image.filters.Grayscale({ mode: grayscaleMode.value }))
  }
  
  if (invert.value) {
    target.filters.push(new fabric.Image.filters.Invert())
  }
  
  if (sepia.value) {
    target.filters.push(new fabric.Image.filters.Sepia())
  }
  
  if (blackWhite.value) {
    target.filters.push(new fabric.Image.filters.BlackWhite())
  }

  if (brownie.value) {
    target.filters.push(new fabric.Image.filters.Brownie())
  }

  if (vintage.value) {
    target.filters.push(new fabric.Image.filters.Vintage())
  }

  if (kodachrome.value) {
    target.filters.push(new fabric.Image.filters.Kodachrome())
  }

  if (technicolor.value) {
    target.filters.push(new fabric.Image.filters.Technicolor())
  }

  if (polaroid.value) {
    target.filters.push(new fabric.Image.filters.Polaroid())
  }

  target.applyFilters()
  canvas().requestRenderAll()
}
</script>

<template>
  <PropBlock v-model="enable" @change="onEnableChange" label="颜色">
    <Box spaceY1>
      <Box>色相</Box>
      <Slider :value="hue" min="-1" max="1" step="0.01" @change="val => onHueChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>亮度</Box>
      <Slider :value="brightness" min="-1" max="1" step="0.01" @change="val => onBrightnessChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>对比度</Box>
      <Slider :value="contrast" min="-1" max="1" step="0.01" @change="val => onContrastChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>饱和度</Box>
      <Slider :value="saturation" min="-1" max="1" step="0.01" @change="val => onSaturationChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>自然饱和度</Box>
      <Slider :value="vibrance" min="-1" max="1" step="0.01" @change="val => onVibranceChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>噪声</Box>
      <Slider :value="noise" min="0" max="3000" step="1" @change="val => onNoiseChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>像素化</Box>
      <Slider :value="pixelate" min="1" max="64" step="1" @change="val => onPixelateChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>高斯模糊</Box>
      <Slider :value="blur" min="0" max="1" step="0.01" @change="val => onBlurChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>红</Box>
      <Slider :value="gammaRed" min="0" max="1" step="0.01" @change="val => onGammaRedChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>绿</Box>
      <Slider :value="gammaGreen" min="0" max="1" step="0.01" @change="val => onGammaGreenChange(val)"/>
    </Box>
    <Box spaceY1>
      <Box>蓝</Box>
      <Slider :value="gammaBlue" min="0" max="1" step="0.01" @change="val => onGammaBlueChange(val)"/>
    </Box>
    <Box toBetween>
      <Box>颜色混合</Box>
      <Toogle v-model="blendColor" @change="onBlendColorChange"/>
    </Box>
    <Box toBetween v-if="blendColor">
      <Box>模式</Box>
      <Select v-model="blendColorMode" :options="blendColorOptions" @change="onBlendColorModeChange"/>
    </Box>
    <ColorField v-if="blendColor" v-model="blendColorColor" @change="onBlendColorColorChange"/>
    <Box toBetween v-if="blendColor">
      <Box>透明度</Box>
      <Slider :value="blendColorAlpha" min="0" max="1" step="0.01" @change="val => onBlendColorAlphaChange(val)"/>
    </Box>
    <!-- <Box toBetween>
      <Box>图像混合</Box>
      <Toogle v-model="blendImage" @change="onBlendImageChange"/>
    </Box> -->
    <Box toBetween v-if="blendImage">
      <Box>模式</Box>
      <Select v-model="blendImageMode" :options="blendImageOptions" @change="onBlendImageModeChange"/>
    </Box>
    <Box toBetween v-if="blendImage">
      <Box>透明度</Box>
      <Slider :value="blendImageAlpha" min="0" max="1" step="0.01" @change="val => onBlendImageAlphaChange(val)"/>
    </Box>
    <Box toBetween>
      <Box>尖锐</Box>
      <Toogle v-model="sharpen" @change="onSharpenChange"/>
    </Box>
    <Box toBetween>
      <Box>浮雕</Box>
      <Toogle v-model="emboss" @change="onEmbossChange"/>
    </Box>
    <Box toBetween>
      <Box>灰度</Box>
      <Toogle v-model="grayscale" @change="onGrayScaleChange"/>
    </Box>
    <Box toBetween v-if="grayscale">
      <Box>灰度模式</Box>
      <Select v-model="grayscaleMode" :options="grayScaleOptions" @change="onGrayScaleModeChange"/>
    </Box>
    <Box toBetween>
      <Box>反色</Box>
      <Toogle v-model="invert" @change="onInvertChange"/>
    </Box>
    <Box toBetween>
      <Box>深棕</Box>
      <Toogle v-model="sepia" @change="onSepiaChange"/>
    </Box>
    <Box toBetween>
      <Box>黑白</Box>
      <Toogle v-model="blackWhite" @change="onBlackWhiteChange"/>
    </Box>
    <Box toBetween>
      <Box>巧克力</Box>
      <Toogle v-model="brownie" @change="onBrownieChange"/>
    </Box>
    <Box toBetween>
      <Box>陈旧</Box>
      <Toogle v-model="vintage" @change="onVintageChange"/>
    </Box>
    <Box toBetween>
      <Box>胶片</Box>
      <Toogle v-model="kodachrome" @change="onKodachromeChange"/>
    </Box>
    <Box toBetween>
      <Box>鲜艳</Box>
      <Toogle v-model="technicolor" @change="onTechnicolorChange"/>
    </Box>
    <Box toBetween>
      <Box>立拍得</Box>
      <Toogle v-model="polaroid" @change="onPolaroidChange"/>
    </Box>
  </PropBlock>
</template>