<script setup>
import { ref } from 'vue'
import Panel from '../../components/Panel'
import Box from '@/fower/Box.vue'
import Library from './Library'
import UploadImage from './UploadImage'
import Tab from '@/components/Tab'
import TextField from '@/views/ImageEditor/components/TextField'
import IconButton from '../../components/IconButton'

const tab = ref('搜索')
const searchText = ref('')
const library = ref(null)

const onSearch = () => {
  library.value.search(searchText.value)
}

const onScrollToEnd = () => {
  library.value.loadMore()
}
</script>

<template>
  <Panel width="260" title="添加图像" @scrollToEnd="onScrollToEnd">
    <template v-slot:toolbar>
      <Tab my4 v-model="tab" tabs="搜索,上传"/>
      <Box v-show="tab === '搜索'" row spaceX2 mx4>
        <TextField flex1 textXS v-model="searchText" placeholder="输入关键词搜索图片"/>
        <IconButton icon="zoom" @click="onSearch"/>
      </Box>
    </template>
    <Library ref="library" v-show="tab === '搜索'"/>
    <UploadImage v-show="tab === '上传'"/>
    <!-- <UploadImage/> -->
  </Panel>
</template>