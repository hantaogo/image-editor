<script setup>
import { ref, reactive } from 'vue'
import { fower } from '@/fower/fower'
import Box from '@/fower/Box.vue'
import SvgIcon from '@/components/SvgIcon'
import TextField from '@/views/ImageEditor/components/TextField'
import Modal from '@/views/ImageEditor/components/Modal'

const emit = defineEmits(['ok'])

const allFontInfoList = [
  {
    fontFamily: 'alder',
    thumbUrl: './assets/fontImages/alder.png',
    fontUrl: './assets/fonts/alder.woff',
  },
  {
    fontFamily: 'boullervard',
    fontUrl: './assets/fonts/boullervard.woff',
    thumbUrl: './assets/fontImages/boullervard.png',
  },
  {
    fontFamily: 'avocado',
    fontUrl: './assets/fonts/avocado.woff',
    thumbUrl: './assets/fontImages/avocado.png',
  },
  {
    fontFamily: 'alder2',
    thumbUrl: './assets/fontImages/alder.png',
    fontUrl: './assets/fonts/alder.woff',
  },
  {
    fontFamily: 'boullervard2',
    fontUrl: './assets/fonts/boullervard.woff',
    thumbUrl: './assets/fontImages/boullervard.png',
  },
  {
    fontFamily: 'avocado2',
    fontUrl: './assets/fonts/avocado.woff',
    thumbUrl: './assets/fontImages/avocado.png',
  },
  {
    fontFamily: 'alder3',
    thumbUrl: './assets/fontImages/alder.png',
    fontUrl: './assets/fonts/alder.woff',
  },
  {
    fontFamily: 'boullervard3',
    fontUrl: './assets/fonts/boullervard.woff',
    thumbUrl: './assets/fontImages/boullervard.png',
  },
  {
    fontFamily: 'avocado3',
    fontUrl: './assets/fonts/avocado.woff',
    thumbUrl: './assets/fontImages/avocado.png',
  },
  {
    fontFamily: 'alder4',
    thumbUrl: './assets/fontImages/alder.png',
    fontUrl: './assets/fonts/alder.woff',
  },
  {
    fontFamily: 'boullervard4',
    fontUrl: './assets/fonts/boullervard.woff',
    thumbUrl: './assets/fontImages/boullervard.png',
  },
  {
    fontFamily: 'avocado4',
    fontUrl: './assets/fonts/avocado.woff',
    thumbUrl: './assets/fontImages/avocado.png',
  },
  {
    fontFamily: 'alder5',
    thumbUrl: './assets/fontImages/alder.png',
    fontUrl: './assets/fonts/alder.woff',
  },
  {
    fontFamily: 'boullervard5',
    fontUrl: './assets/fonts/boullervard.woff',
    thumbUrl: './assets/fontImages/boullervard.png',
  },
  {
    fontFamily: 'avocado5',
    fontUrl: './assets/fonts/avocado.woff',
    thumbUrl: './assets/fontImages/avocado.png',
  },
]

const myFontInfoList = reactive([])
const fontInfoList = reactive(JSON.parse(JSON.stringify(allFontInfoList)))
const searchText = ref('')
const input = ref(null)
const visible = ref(false)

const open = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
}

const onSearchTextChange = val => {
  const arr = JSON.parse(JSON.stringify(allFontInfoList.filter(t => t.fontFamily.includes(val))))
  fontInfoList.splice(0, fontInfoList.length)
  for (const t of arr) {
    fontInfoList.push(t)
  }
}

const onClick = fontInfo => {
  loadFont(fontInfo).then(() => {
    close()
    emit('ok', fontInfo.fontFamily)
  })
}

const loadFont = fontInfo => {
  return new Promise(resolve => {
    const fontFace = new FontFace(fontInfo.fontFamily, `url(${fontInfo.fontUrl})`)
    fontFace.load().then(res => {
      console.log('字体加载完毕', fontInfo.fontFamily)
      document.fonts.add(res)
      resolve()
    })
  })
}

const upload = () => {
  input.value.click()
}

const onUpload = e => {
  const files = e.target.files
  if (files.length < 1) {
    return
  }
  const file = files[0]
  // 读取文件
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = event => {
    e.target.value = ''
    const fontFamily = file.name.replace(/\.[^.]*$/, '')
    const fontUrl = event.target.result
    // 加载字体
    const fontFace = new FontFace(fontFamily, `url(${fontUrl})`)
    fontFace.load().then(res => {
      console.log('字体上传完毕', fontFamily)
      document.fonts.add(res)
      const thumbUrl = fontToImageUrl(fontFamily)
      const index = myFontInfoList.findIndex(t => t.fontFamily === fontFamily)
      const info = {
        fontFamily,
        fontUrl,
        thumbUrl,
      }
      if (index === -1) {
        myFontInfoList.push(info)
      } else {
        myFontInfoList[index] = info
      }
      emit('ok', fontFamily)
    })
  }
}

const fontToImageUrl = fontFamily => {
  const c = document.createElement('canvas')
  c.width = 200
  c.height = 40
  const ctx = c.getContext('2d')
  ctx.font = `24px ${fontFamily}`
  ctx.fillStyle = '#ffffff'
  ctx.fillText(fontFamily, 0, 30)
  return c.toDataURL()
}

const removeMyFont = fontInfo => {
  const index = myFontInfoList.findIndex(t => t.fontFamily === fontInfo.fontFamily)
  if (index !== -1) {
    myFontInfoList.splice(index, 1)
  }
}

const getHeight = () => {
  const height = parseInt(document.body.getBoundingClientRect().height - 44 - 1)
  return `${height}px`
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Modal
    v-if="visible"
    title="选择字体"
    cancelLabel="返回"
    okLabel="上传字体"
    left="45px"
    top="0px"
    width="261px"
    :height="getHeight()"
    transform=""
    :background="false"
    @close="close"
    @ok="upload"
  >
    <template v-slot:toolbar>
      <Box row spaceX3 p2 toCenterY>
        <SvgIcon name="zoom" :class="fower`square5`" />
        <TextField
          w="100%"
          h="28"
          placeholder="搜寻"
          v-model="searchText"
          @change="onSearchTextChange"
        />
      </Box>
    </template>
    <Box w="100%" h="100%" style="background-color: #292c31;" white column toBetween>
      <Box overflowYAuto>
        <Box mt2 flex1>
          <Box
            v-for="fontInfo of myFontInfoList"
            :key="fontInfo.fontFamily"
            cursorPointer
            bgGray600--T60--hover
            @click="() => onClick(fontInfo)"
          >
            <Box row toBetween toCenterY spaceX2 pr4>
              <img :src="fontInfo.thumbUrl" class="image" />
              <SvgIcon
                name="close"
                :class="fower`square3 cursorPointer`"
                @click.stop="() => removeMyFont(fontInfo)"
              />
            </Box>
          </Box>
        </Box>
        <Box mt2 flex1>
          <Box
            v-for="fontInfo of fontInfoList"
            :key="fontInfo.fontFamily"
            cursorPointer
            bgGray600--T60--hover
            @click="() => onClick(fontInfo)"
          >
            <img :src="fontInfo.thumbUrl" class="image" />
          </Box>
        </Box>
      </Box>
      <input ref="input" v-show="false" type="file" @change="onUpload" />
    </Box>
  </Modal>
</template>

<style lang="less" scoped>
.image {
  margin-left: 10px;
  width: 200px;
  height: 40px;
}
</style>